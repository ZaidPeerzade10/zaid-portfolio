"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, Sparkles, X } from "lucide-react";

type Msg = { role: "user" | "assistant"; text: string };

const SUGGESTIONS = [
  "What does Zaid do at Maxnet?",
  "Which project should I look at first?",
  "What's his AI stack?",
  "How do I contact him?",
];

export function Chat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const msgsRef = useRef<Msg[]>([]);
  msgsRef.current = msgs;

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || busy) return;
    const next = [...msgsRef.current, { role: "user" as const, text: q }];
    setMsgs(next);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-10) }),
      });
      const data = await res.json();
      setMsgs((m) => [...m, { role: "assistant", text: data.reply || "I couldn't answer that. Try asking another way." }]);
    } catch {
      setMsgs((m) => [...m, { role: "assistant", text: "The assistant didn't respond. Check your connection and try again, or email eng.zpeerzade@gmail.com." }]);
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    const onAsk = (e: Event) => {
      setOpen(true);
      const q = (e as CustomEvent<string>).detail;
      if (q) setTimeout(() => send(q), 50);
      else setTimeout(() => inputRef.current?.focus(), 50);
    };
    window.addEventListener("zp:ask", onAsk);
    return () => window.removeEventListener("zp:ask", onAsk);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, busy]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-bone px-4 py-2.5 text-sm font-medium text-ink shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-transform duration-150 active:scale-[0.97] ${open ? "pointer-events-none opacity-0" : ""}`}
        aria-label="Ask Zaid's AI assistant"
      >
        <Sparkles className="h-4 w-4" /> Ask AI
      </button>

      <div
        role="dialog"
        aria-label="Zaid's AI assistant"
        className={`chat-panel fixed inset-x-3 bottom-3 z-50 flex h-[min(560px,80vh)] flex-col overflow-hidden rounded-2xl border border-line bg-[#0f0f0f] shadow-[0_30px_80px_rgba(0,0,0,0.6)] sm:inset-x-auto sm:right-5 sm:w-[380px] ${open ? "is-open" : ""}`}
      >
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/zaid.webp" alt="" className="h-8 w-8 rounded-full object-cover object-top" />
            <div>
              <p className="text-sm font-semibold text-bone">Zaid&apos;s AI assistant</p>
              <p className="text-xs text-mist">Answers from his work and resume</p>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="grid h-8 w-8 place-items-center rounded-full text-mist hover:bg-white/10 hover:text-bone" aria-label="Close assistant">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {msgs.length === 0 ? (
            <div className="flex h-full flex-col justify-end">
              <p className="text-3xl font-extrabold leading-[1.05] tracking-[-0.04em] text-bone">Get to know Zaid&apos;s work.</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => send(s)} className="rounded-full border border-line px-3 py-1.5 text-left text-xs text-bone transition-colors hover:border-bone">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            msgs.map((m, i) => (
              <div key={i} className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${m.role === "user" ? "ml-auto bg-bone text-ink" : "bg-white/[0.07] text-bone"}`}>
                {m.text}
              </div>
            ))
          )}
          {busy && (
            <div className="flex w-14 items-center justify-center gap-1 rounded-2xl bg-white/[0.07] px-3 py-3" aria-label="Thinking">
              {[0, 1, 2].map((d) => (
                <span key={d} className="typing-dot h-1.5 w-1.5 rounded-full bg-bone" style={{ animationDelay: `${d * 140}ms` }} />
              ))}
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-end gap-2 border-t border-line p-3"
        >
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            maxLength={500}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            placeholder="Ask about projects, skills, experience…"
            className="max-h-28 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-bone placeholder:text-dim focus:outline-none"
          />
          <button type="submit" disabled={!input.trim() || busy} className="grid h-9 w-9 place-items-center rounded-full bg-bone text-ink transition-opacity disabled:opacity-30" aria-label="Send">
            <ArrowUp className="h-4 w-4" />
          </button>
        </form>
      </div>
    </>
  );
}
