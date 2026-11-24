"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { projects, type Project } from "@/lib/data";
import { slug } from "./nav";

/* Little paper mock-ups that slide out of each folder. Drawn with HTML, no screenshots. */
function Sheet({ kind, n }: { kind: Project["mock"]; n: 1 | 2 | 3 }) {
  const base = "h-full w-full rounded-[6px] bg-white p-2.5 text-[7px] leading-tight text-black shadow-[0_8px_24px_rgba(0,0,0,0.35)]";
  const line = (w: string, dark = false) => <div className={`mb-1 h-[3px] rounded-full ${dark ? "bg-black" : "bg-black/15"}`} style={{ width: w }} />;
  if (kind === "sql") {
    if (n === 1) return <div className={base}><p className="mb-1 font-bold">schema</p>{["users", "orders", "items"].map((t) => <p key={t} className="mb-0.5 border border-black/20 px-1">{t}</p>)}</div>;
    if (n === 2) return <div className={`${base} font-mono`}><p className="font-bold">SELECT</p><p>city, SUM(total)</p><p className="font-bold">FROM</p><p>orders</p><p className="font-bold">GROUP BY</p><p>city;</p></div>;
    return <div className={base}><p className="mb-1 rounded bg-black/5 p-1">Top cities by revenue?</p><p className="rounded bg-black p-1 text-white">Pune leads with ₹4.2L this month.</p></div>;
  }
  if (kind === "queue") {
    if (n === 1) return <div className={base}><p className="mb-1 font-bold">queue</p>{["invoice-bot", "mail-bot", "report-bot"].map((t, i) => <p key={t} className="mb-0.5 flex justify-between"><span>{t}</span><span>{["done", "running", "waiting"][i]}</span></p>)}</div>;
    if (n === 2) return <div className={`${base} flex items-center justify-center gap-1`}><span className="rounded bg-black px-2 py-1 text-white">pause</span><span className="rounded border border-black px-2 py-1">resume</span></div>;
    return <div className={`${base} flex items-end gap-1`}>{[40, 70, 55, 90, 65].map((h, i) => <div key={i} className="flex-1 bg-black" style={{ height: `${h}%` }} />)}</div>;
  }
  if (kind === "doc") {
    if (n === 1) return <div className={base}><p className="mb-1 font-bold">policy.pdf</p>{line("90%")}{line("70%")}{line("85%", true)}{line("60%")}{line("80%")}</div>;
    if (n === 2) return <div className={base}><p className="mb-1 font-bold">search</p><p className="mb-1 border border-black/30 px-1">leave carry-forward?</p>{line("80%")}{line("65%")}</div>;
    return <div className={base}><p className="rounded bg-black p-1 text-white">Up to 10 days carry over, see p.4</p></div>;
  }
  if (kind === "grad") {
    if (n === 1) return <div className={`${base} font-mono`}><p>a = Value(2.0)</p><p>b = a * 3</p><p>b.backward()</p><p className="mt-1 font-bold">a.grad = 3.0</p></div>;
    if (n === 2)
      return (
        <div className={base}>
          <svg viewBox="0 0 60 40" className="h-full w-full">
            {[[10, 10], [10, 30], [30, 20], [50, 20]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={4} fill="none" stroke="black" />)}
            <path d="M14 11 L26 19 M14 29 L26 21 M34 20 L46 20" stroke="black" />
          </svg>
        </div>
      );
    return <div className={base}><svg viewBox="0 0 60 40" className="h-full w-full"><path d="M2 4 C 12 30, 22 34, 58 36" fill="none" stroke="black" strokeWidth={1.5} /></svg></div>;
  }
  // daily
  if (n === 1) return <div className={`${base} grid grid-cols-7 gap-0.5`}>{Array.from({ length: 28 }).map((_, i) => <div key={i} className={`aspect-square rounded-[2px] ${(i * 7 + 3) % 10 < 7 ? "bg-black" : "bg-black/10"}`} />)}</div>;
  if (n === 2) return <div className={base}><p className="mb-1 font-bold">task.md</p>{line("90%", true)}{line("70%")}{line("80%")}{line("50%")}</div>;
  return <div className={`${base} flex flex-col items-center justify-center`}><p className="text-[16px] font-extrabold">21</p><p>day streak</p></div>;
}

function Folder({ p, onOpen }: { p: Project; onOpen: () => void }) {
  return (
    <div id={`project-${slug(p.title)}`} className="scroll-mt-24">
      <button onClick={onOpen} className="folder group relative block aspect-[4/3] w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-bone focus-visible:ring-offset-4 focus-visible:ring-offset-ink" aria-label={`Open ${p.title}`}>
        {/* back of the folder with its tab */}
        <div className="absolute inset-x-0 bottom-0 top-[8%] rounded-xl rounded-tl-none bg-[#2b2b2b]" />
        <div className="absolute left-0 top-0 h-[12%] w-[42%] rounded-t-xl bg-[#2b2b2b]" />
        {/* sheets */}
        {([1, 2, 3] as const).map((n) => (
          <div key={n} className={`sheet sheet-${n} absolute left-[22%] top-[22%] h-[56%] w-[56%]`} style={{ zIndex: n }}>
            <Sheet kind={p.mock} n={n} />
          </div>
        ))}
        {/* front flap */}
        <div className="flap absolute inset-x-0 bottom-0 top-[30%] z-10 flex flex-col justify-end rounded-xl border-t border-white/10 bg-[#1c1c1c] p-4">
          <div className="flex items-end justify-between gap-3">
            <span className="text-lg font-bold leading-tight tracking-tight text-bone sm:text-xl">{p.title}</span>
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-bone text-ink">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </button>
      <p className="mt-4 text-sm leading-relaxed text-mist">{p.tagline}</p>
    </div>
  );
}

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <section id="work" className="mx-auto max-w-[1280px] px-5 pb-24 sm:px-8 md:pb-32">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <h2 className="text-[clamp(2.6rem,6vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.045em] text-bone">
          Featured
          <br />
          projects
        </h2>
        <p className="max-w-xs text-mist">Hover a folder to peek inside. Click it for the full story.</p>
      </div>
      <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <Folder key={p.title} p={p} onOpen={() => setOpen(p)} />
        ))}
      </div>

      {open && (
        <div className="modal-backdrop fixed inset-0 z-[70] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6" onClick={() => setOpen(null)}>
          <div role="dialog" aria-modal="true" aria-labelledby="project-title" className="modal-panel w-full max-w-2xl rounded-t-2xl bg-white p-6 text-black sm:rounded-2xl sm:p-10" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-sm text-black/50">{open.kind}</p>
                <h3 id="project-title" className="mt-1 text-4xl font-extrabold tracking-[-0.04em]">{open.title}</h3>
                <p className="mt-1 text-lg text-black/60">{open.tagline}</p>
              </div>
              <button ref={closeRef} onClick={() => setOpen(null)} className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-black text-white" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-6 text-[17px] leading-relaxed">{open.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {open.stack.map((s) => (
                <span key={s} className="rounded-md border border-black/20 px-3 py-1 text-sm">{s}</span>
              ))}
            </div>
            <div className="mt-8">
              {open.href ? (
                <a href={open.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white">
                  View code on GitHub <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : (
                <p className="text-sm text-black/50">Built for a client, so the code is private. Ask me about it.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
