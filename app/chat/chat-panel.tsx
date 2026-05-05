"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import kikiIcon from "../../assets/kiki-icon.png";
import { SiteFooter } from "../../components/site-footer";
import { LanguageToggle } from "../../components/language-toggle";
import { useLanguage } from "../../components/language-provider";
import { t } from "../../lib/i18n";

type Role = "user" | "assistant";

type ChatMessage = { id: string; role: Role; content: string };

function id() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function ChatPanel() {
  const { lang } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    setError(null);
    setInput("");
    const userMsg: ChatMessage = { id: id(), role: "user", content: text };
    const nextThread = [...messages, userMsg];
    setMessages(nextThread);
    setLoading(true);

    try {
      const payload = nextThread.map(({ role, content }) => ({ role, content }));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payload }),
      });
      const data = (await res.json()) as { content?: string; error?: string };
      if (!res.ok) {
        throw new Error(data.error ?? `Request failed (${res.status})`);
      }
      if (!data.content) {
        throw new Error(t(lang, "chatNoReply"));
      }
      setMessages((m) => [
        ...m,
        { id: id(), role: "assistant", content: data.content as string },
      ]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : t(lang, "chatErrorGeneric");
      setError(msg);
    } finally {
      setLoading(false);
      textareaRef.current?.focus();
    }
  }, [input, loading, messages, lang]);

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send();
    }
  }

  return (
    <div className="chat-page">
      <header className="chat-header">
        <div className="chat-brandRow">
          <Image
            className="chat-brandIcon"
            src={kikiIcon}
            alt=""
            width={40}
            height={40}
            priority
          />
          <span className="chat-brand">Kiki</span>
        </div>
        <div className="chat-header-right">
          <LanguageToggle variant="chat" />
          <Link href="/" className="chat-back">
            {t(lang, "chatHome")}
          </Link>
        </div>
      </header>

      <div className="chat-main">
        <div className="chat-scroll">
          {messages.length === 0 && !loading ? (
            <p className="chat-empty">{t(lang, "chatEmpty")}</p>
          ) : null}

          {messages.map((m) => (
            <div
              key={m.id}
              className={
                m.role === "user" ? "chat-row chat-row--user" : "chat-row chat-row--assistant"
              }
            >
              <div
                className={
                  "chat-bubble " +
                  (m.role === "user" ? "chat-bubble--user" : "chat-bubble--assistant")
                }
              >
                {m.role === "assistant" ? (
                  <div className="chat-md">
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                ) : (
                  <span style={{ whiteSpace: "pre-wrap" }}>{m.content}</span>
                )}
              </div>
            </div>
          ))}

          {loading ? (
            <div className="chat-row chat-row--assistant">
              <div className="chat-bubble chat-bubble--assistant">
                <span className="chat-typing">{t(lang, "chatThinking")}</span>
              </div>
            </div>
          ) : null}

          <div ref={bottomRef} />
        </div>

        <div className="chat-composer">
          {error ? (
            <p className="chat-typing" style={{ color: "#8b2942" }}>
              {error}
            </p>
          ) : null}
          <form
            className="chat-form"
            onSubmit={(e) => {
              e.preventDefault();
              void send();
            }}
          >
            <textarea
              ref={textareaRef}
              className="chat-input"
              rows={2}
              value={input}
              disabled={loading}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={t(lang, "chatPlaceholder")}
              aria-label={t(lang, "chatInputAria")}
            />
            <button type="submit" className="chat-send" disabled={loading || !input.trim()}>
              {t(lang, "chatSend")}
            </button>
          </form>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
