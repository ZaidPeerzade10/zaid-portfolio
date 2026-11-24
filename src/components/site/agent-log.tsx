"use client";

import { useEffect, useState } from "react";

type Row = { sym: string; key: string; val: string; ok?: boolean };

const COMMAND = 'agent run "introduce zaid"';
const ROWS: Row[] = [
  { sym: "›", key: "plan", val: "4 steps" },
  { sym: "›", key: "tool", val: "read(experience)", ok: true },
  { sym: "›", key: "role", val: "Lead AI Engineer @ Maxnet" },
  { sym: "›", key: "tool", val: "read(stack)", ok: true },
  { sym: "›", key: "ships", val: "chatbots, RAG, agents" },
  { sym: "›", key: "study", val: "B.E. Computer, SPPU · 8.02" },
  { sym: "→", key: "done", val: "exit 0 · 0.42s" },
];

export function AgentLog() {
  const [typed, setTyped] = useState(0);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setTyped(COMMAND.length);
      setShown(ROWS.length);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i <= COMMAND.length; i++) {
      timers.push(setTimeout(() => setTyped(i), 600 + i * 38));
    }
    const base = 600 + COMMAND.length * 38 + 250;
    ROWS.forEach((_, i) => timers.push(setTimeout(() => setShown(i + 1), base + i * 260)));
    return () => timers.forEach(clearTimeout);
  }, []);

  const finished = shown === ROWS.length;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-panel shadow-[0_40px_120px_-40px_rgba(255,91,31,0.25)]">
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5 font-mono text-xs text-muted-foreground">
        <span>agent.log</span>
        <span className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping2 rounded-full bg-signal" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
          </span>
          live
        </span>
      </div>
      <div className="min-h-[19rem] space-y-2.5 px-5 py-5 font-mono text-[13px] leading-relaxed sm:text-sm">
        <div>
          <span className="text-signal">$</span>{" "}
          <span className="text-bone">{COMMAND.slice(0, typed)}</span>
          {typed < COMMAND.length && <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-signal" />}
        </div>
        {ROWS.slice(0, shown).map((r, i) => (
          <div key={i} className="grid grid-cols-[1.25rem_4.5rem_1fr] animate-in fade-in slide-in-from-bottom-1 duration-300">
            <span className={r.key === "done" ? "text-signal" : "text-dim"}>{r.sym}</span>
            <span className={r.key === "done" ? "text-signal" : "text-muted-foreground"}>{r.key}</span>
            <span className="text-bone">
              {r.val}
              {r.ok && <span className="ml-3 text-signal">ok</span>}
            </span>
          </div>
        ))}
        {finished && <span className="inline-block h-4 w-2 animate-blink bg-signal" />}
      </div>
    </div>
  );
}
