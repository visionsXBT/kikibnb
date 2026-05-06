import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { KIKI_SYSTEM_PROMPT } from "../../../lib/kiki-system-prompt";

export const runtime = "nodejs";

const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-opus-4-7";
const MAX_MESSAGES = 48;
const MAX_CONTENT = 24_000;
const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY;
const COINGECKO_API_BASE =
  process.env.COINGECKO_API_BASE ??
  (COINGECKO_API_KEY ? "https://pro-api.coingecko.com/api/v3" : "https://api.coingecko.com/api/v3");

const COIN_ALIASES: Record<string, string> = {
  btc: "bitcoin",
  bitcoin: "bitcoin",
  eth: "ethereum",
  ethereum: "ethereum",
  sol: "solana",
  solana: "solana",
  bnb: "binancecoin",
  binancecoin: "binancecoin",
  doge: "dogecoin",
  dogecoin: "dogecoin",
  xrp: "ripple",
  ripple: "ripple",
};

type ClientMessage = { role: "user" | "assistant"; content: string };

function isClientMessage(x: unknown): x is ClientMessage {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  return (
    (o.role === "user" || o.role === "assistant") &&
    typeof o.content === "string"
  );
}

function inferCoinIds(text: string): string[] {
  const lower = text.toLowerCase();
  const ids = new Set<string>();
  for (const [alias, id] of Object.entries(COIN_ALIASES)) {
    const re = new RegExp(`\\b${alias}\\b`, "i");
    if (re.test(lower)) ids.add(id);
  }
  return [...ids];
}

async function fetchCoinSnapshot(userText: string): Promise<string | null> {
  const ids = inferCoinIds(userText);
  if (ids.length === 0) return null;

  const headers: HeadersInit = { accept: "application/json" };
  if (COINGECKO_API_KEY) {
    const keyHeader = COINGECKO_API_BASE.includes("pro-api.coingecko.com")
      ? "x-cg-pro-api-key"
      : "x-cg-demo-api-key";
    headers[keyHeader] = COINGECKO_API_KEY;
  }

  const qs = new URLSearchParams({
    ids: ids.join(","),
    vs_currencies: "usd",
    include_24hr_change: "true",
    include_last_updated_at: "true",
  });

  try {
    const res = await fetch(`${COINGECKO_API_BASE}/simple/price?${qs.toString()}`, {
      headers,
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as Record<
      string,
      { usd?: number; usd_24h_change?: number; last_updated_at?: number }
    >;

    const lines = ids
      .map((id) => {
        const row = data[id];
        if (!row || typeof row.usd !== "number") return null;
        const change =
          typeof row.usd_24h_change === "number" ? `${row.usd_24h_change.toFixed(2)}%` : "n/a";
        const updated =
          typeof row.last_updated_at === "number"
            ? new Date(row.last_updated_at * 1000).toISOString()
            : "unknown";
        return `- ${id}: $${row.usd.toLocaleString("en-US")} (24h: ${change}, updated: ${updated})`;
      })
      .filter((x): x is string => Boolean(x));

    if (lines.length === 0) return null;
    return [
      "Realtime market snapshot from CoinGecko (USD).",
      "Use these as current reference prices when relevant:",
      ...lines,
    ].join("\n");
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Chat is not configured: set ANTHROPIC_API_KEY on the server (see .env.example).",
      },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || !("messages" in body)) {
    return NextResponse.json(
      { error: "Expected body: { messages: { role, content }[] }." },
      { status: 400 },
    );
  }

  const raw = (body as { messages: unknown }).messages;
  if (!Array.isArray(raw) || raw.length === 0) {
    return NextResponse.json(
      { error: "messages must be a non-empty array." },
      { status: 400 },
    );
  }

  if (raw.length > MAX_MESSAGES) {
    return NextResponse.json(
      { error: `Too many messages (max ${MAX_MESSAGES}).` },
      { status: 400 },
    );
  }

  const messages: ClientMessage[] = [];
  for (const m of raw) {
    if (!isClientMessage(m)) {
      return NextResponse.json(
        { error: "Each message must have role user|assistant and string content." },
        { status: 400 },
      );
    }
    if (m.content.length > MAX_CONTENT) {
      return NextResponse.json(
        { error: `Message too long (max ${MAX_CONTENT} characters).` },
        { status: 400 },
      );
    }
    messages.push({ role: m.role, content: m.content.trim() });
  }

  if (messages[0].role !== "user") {
    return NextResponse.json(
      { error: "First message must be from the user." },
      { status: 400 },
    );
  }

  const anthropic = new Anthropic({ apiKey });
  const latestUser = [...messages].reverse().find((m) => m.role === "user");
  const coinSnapshot = latestUser ? await fetchCoinSnapshot(latestUser.content) : null;

  try {
    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 8192,
      system: coinSnapshot ? `${KIKI_SYSTEM_PROMPT}\n\n${coinSnapshot}` : KIKI_SYSTEM_PROMPT,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const text = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();

    if (!text) {
      return NextResponse.json(
        { error: "Empty response from model." },
        { status: 502 },
      );
    }

    return NextResponse.json({ content: text });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Upstream request failed.";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
