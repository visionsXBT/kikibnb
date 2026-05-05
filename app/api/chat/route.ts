import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { KIKI_SYSTEM_PROMPT } from "../../../lib/kiki-system-prompt";

export const runtime = "nodejs";

const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-opus-4-7";
const MAX_MESSAGES = 48;
const MAX_CONTENT = 24_000;

type ClientMessage = { role: "user" | "assistant"; content: string };

function isClientMessage(x: unknown): x is ClientMessage {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  return (
    (o.role === "user" || o.role === "assistant") &&
    typeof o.content === "string"
  );
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

  try {
    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 8192,
      system: KIKI_SYSTEM_PROMPT,
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
