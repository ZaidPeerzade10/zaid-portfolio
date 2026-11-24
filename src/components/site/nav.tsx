"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Search, Sparkles, X } from "lucide-react";
import { navLinks, personalData, projects } from "@/lib/data";

type Item = { label: string; hint: string; href?: string; ask?: string };

export function askAI(q?: string) {
  window.dispatchEvent(new CustomEvent("zp:ask", { detail: q ?? "" }));
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: Item[] = useMemo(
    () => [
      ...navLinks.map((l) => ({ label: l.label, hint: "Section", href: l.href })),
      ...projects.map((p) => ({ label: p.title, hint: p.tagline, href: `#project-${slug(p.title)}` })),
      { label: "Resume", hint: "PDF", href: personalData.resumeUrl },
      { label: "LinkedIn", hint: "Profile", href: personalData.social.linkedin },
      { label: "GitHub", hint: "Code", href: personalData.social.github },
      { label: "Email", hint: personalData.email, href: `mailto:${personalData.email}` },
    ],
    []
  );

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    const list = t ? items.filter((i) => (i.label + " " + i.hint).toLowerCase().includes(t)) : items;
    const ask: Item = { label: t ? `Ask AI: “${q.trim()}”` : "Ask my AI anything", hint: "AI assistant", ask: q.trim() };
    return [...list.slice(0, 8), ask];
  }, [q, items]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [open]);

  const go = (it: Item) => {
    setOpen(false);
    if (it.ask !== undefined) return askAI(it.ask);
    if (!it.href) return;
    if (it.href.startsWith("#")) document.querySelector(it.href)?.scrollIntoView({ behavior: "smooth" });
    else window.open(it.href, it.href.startsWith("mailto") ? "_self" : "_blank", "noopener");
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line/60 bg-ink/75 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-5 sm:px-8">
          <a href="#top" className="text-xl font-bold tracking-tight text-bone">
            Zaid<span className="text-mist">.</span>
          </a>
          <button
            onClick={() => setOpen(true)}
            className="flex h-9 w-full max-w-[280px] items-center gap-2 rounded-full border border-line bg-panel px-4 text-left text-sm text-mist transition hover:border-mist"
            aria-label="Search the site"
          >
            <Search className="h-4 w-4" />
            <span className="flex-1">Search</span>
            <kbd className="hidden rounded border border-line px-1.5 font-mono text-[10px] sm:inline">⌘K</kbd>
          </button>
          <button
            onClick={() => askAI()}
            className="hidden items-center gap-2 rounded-full bg-bone px-4 py-2 text-sm font-medium text-ink transition hover:bg-white sm:inline-flex"
          >
            <Sparkles className="h-4 w-4" /> Ask AI
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-panel shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="h-4 w-4 text-mist" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setActive(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setActive((a) => Math.min(a + 1, results.length - 1));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setActive((a) => Math.max(a - 1, 0));
                  } else if (e.key === "Enter") go(results[active]);
                }}
                placeholder="Search projects, sections, links…"
                className="h-14 flex-1 bg-transparent text-bone placeholder:text-dim focus:outline-none"
              />
              <button onClick={() => setOpen(false)} aria-label="Close search" className="text-mist hover:text-bone">
                <X className="h-4 w-4" />
              </button>
            </div>
            <ul className="max-h-[50vh] overflow-auto p-2">
              {results.map((it, i) => (
                <li key={it.label + i}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(it)}
                    className={`flex w-full items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-left text-sm ${i === active ? "bg-bone text-ink" : "text-bone"}`}
                  >
                    <span className="flex items-center gap-2">
                      {it.ask !== undefined && <Sparkles className="h-3.5 w-3.5" />}
                      {it.label}
                    </span>
                    <span className={`flex items-center gap-1 truncate font-mono text-[11px] ${i === active ? "text-ink/60" : "text-mist"}`}>
                      {it.hint}
                      {it.href && !it.href.startsWith("#") && <ArrowUpRight className="h-3 w-3" />}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
