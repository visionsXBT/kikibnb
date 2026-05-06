import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { KIKI_SYSTEM_PROMPT } from "../../../lib/kiki-system-prompt";

export const runtime = "nodejs";

const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-opus-4-7";
const MAX_MESSAGES = 48;
const MAX_CONTENT = 24_000;
const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY;
const DEFAULT_COINGECKO_BASE = "https://api.coingecko.com/api/v3";
const COINGECKO_API_BASE =
  process.env.COINGECKO_API_BASE ?? DEFAULT_COINGECKO_BASE;
const PRO_COINGECKO_BASE = "https://pro-api.coingecko.com/api/v3";

type ClientMessage = { role: "user" | "assistant"; content: string };
type SnapshotRow = { usd?: number; usd_24h_change?: number; last_updated_at?: number };

function isClientMessage(x: unknown): x is ClientMessage {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  return (
    (o.role === "user" || o.role === "assistant") &&
    typeof o.content === "string"
  );
}

function authHeadersForBase(base: string): HeadersInit {
  const isProBase = base.includes("pro-api.coingecko.com");
  const headers: HeadersInit = { accept: "application/json" };
  if (COINGECKO_API_KEY) {
    headers[isProBase ? "x-cg-pro-api-key" : "x-cg-demo-api-key"] = COINGECKO_API_KEY;
  }
  return headers;
}

function maybeAddDemoKey(base: string, qs: URLSearchParams): void {
  const isProBase = base.includes("pro-api.coingecko.com");
  if (COINGECKO_API_KEY && !isProBase) {
    qs.set("x_cg_demo_api_key", COINGECKO_API_KEY);
  }
}

function candidateQueriesFromText(text: string): string[] {
  const lower = text.toLowerCase().trim();
  const out = new Set<string>();
  if (lower) out.add(lower);

  for (const m of lower.matchAll(/\$([a-z0-9]{2,20})/g)) {
    out.add(m[1]);
  }
  for (const m of lower.matchAll(/\b[a-z][a-z0-9-]{1,24}\b/g)) {
    const w = m[0];
    if (["what", "today", "price", "outlook", "coin", "crypto"].includes(w)) continue;
    out.add(w);
  }
  for (const m of text.matchAll(/[\u3400-\u9FFF]{2,30}/g)) {
    const chunk = m[0]
      .replace(/(今日|今天|前景|如何|走势|价格|行情|分析|看法|多少|是什么|预测)/g, "")
      .trim();
    if (chunk.length >= 2) out.add(chunk);
  }

  return [...out].slice(0, 12);
}

async function resolveCoinIdsForBase(base: string, userText: string): Promise<string[]> {
  const headers = authHeadersForBase(base);
  const candidates = candidateQueriesFromText(userText);
  const ids = new Set<string>();

  for (const query of candidates) {
    const qs = new URLSearchParams({ query });
    maybeAddDemoKey(base, qs);
    const res = await fetch(`${base}/search?${qs.toString()}`, { headers, cache: "no-store" });
    if (!res.ok) continue;
    const data = (await res.json()) as {
      coins?: Array<{ id?: string; market_cap_rank?: number | null }>;
    };
    const ranked = [...(data.coins ?? [])]
      .filter((c): c is { id: string; market_cap_rank?: number | null } => typeof c.id === "string")
      .sort((a, b) => (a.market_cap_rank ?? 1e9) - (b.market_cap_rank ?? 1e9))
      .slice(0, 2);
    for (const c of ranked) ids.add(c.id);
    if (ids.size >= 4) break;
  }

  return [...ids];
}

async function fetchCoinSnapshot(userText: string): Promise<string | null> {
  const bases =
    COINGECKO_API_BASE === DEFAULT_COINGECKO_BASE
      ? [DEFAULT_COINGECKO_BASE, PRO_COINGECKO_BASE]
      : [COINGECKO_API_BASE, DEFAULT_COINGECKO_BASE, PRO_COINGECKO_BASE];
  const uniqueBases = [...new Set(bases)];

  async function trySimplePrice(base: string, ids: string[]): Promise<Record<string, SnapshotRow> | null> {
    const headers = authHeadersForBase(base);
    const qs = new URLSearchParams({
      ids: ids.join(","),
      vs_currencies: "usd",
      include_24hr_change: "true",
      include_last_updated_at: "true",
    });
    maybeAddDemoKey(base, qs);
    const res = await fetch(`${base}/simple/price?${qs.toString()}`, {
      headers,
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as Record<string, SnapshotRow>;
  }

  async function tryCoinById(base: string, ids: string[]): Promise<Record<string, SnapshotRow> | null> {
    const headers = authHeadersForBase(base);
    const out: Record<string, SnapshotRow> = {};
    for (const id of ids) {
      const qs = new URLSearchParams({
        localization: "false",
        tickers: "false",
        market_data: "true",
        community_data: "false",
        developer_data: "false",
        sparkline: "false",
      });
      maybeAddDemoKey(base, qs);
      const res = await fetch(`${base}/coins/${id}?${qs.toString()}`, {
        headers,
        cache: "no-store",
      });
      if (!res.ok) continue;
      const data = (await res.json()) as {
        market_data?: { current_price?: { usd?: number }; price_change_percentage_24h?: number };
        last_updated?: string;
      };
      const usd = data.market_data?.current_price?.usd;
      if (typeof usd !== "number") continue;
      const ts = data.last_updated ? Date.parse(data.last_updated) : NaN;
      out[id] = {
        usd,
        usd_24h_change: data.market_data?.price_change_percentage_24h,
        last_updated_at: Number.isFinite(ts) ? Math.floor(ts / 1000) : undefined,
      };
    }
    return Object.keys(out).length ? out : null;
  }

  for (const base of uniqueBases) {
    try {
      const ids = await resolveCoinIdsForBase(base, userText);
      if (!ids.length) continue;
      const fromSimple = await trySimplePrice(base, ids);
      const fromCoinById = fromSimple ? null : await tryCoinById(base, ids);
      const data = fromSimple ?? fromCoinById;
      if (!data) continue;

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
      if (!lines.length) continue;

      return [
        "Realtime market snapshot from CoinGecko (USD).",
        "You DO have realtime data in this snapshot; do not claim you lack live access.",
        "Use these as current reference prices when relevant:",
        ...lines,
      ].join("\n");
    } catch {
      // Try next base/strategy.
    }
  }

  return null;
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
    const modelMessages = messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));
    if (coinSnapshot) {
      modelMessages.push({
        role: "user",
        content:
          `[System data context - not a user request]\n` +
          `Use this live market snapshot when answering the prior user question.\n` +
          `${coinSnapshot}`,
      });
    }

    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 8192,
      system: coinSnapshot ? `${KIKI_SYSTEM_PROMPT}\n\n${coinSnapshot}` : KIKI_SYSTEM_PROMPT,
      messages: modelMessages,
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
