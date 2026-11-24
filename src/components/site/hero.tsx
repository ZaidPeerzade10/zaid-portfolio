"use client";

import { useRef } from "react";
import { Sparkles } from "lucide-react";
import { askAI } from "./nav";

export function Hero() {
  const card = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = card.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`;
  };
  const onLeave = () => {
    if (card.current) card.current.style.transform = "";
  };

  return (
    <section id="top" className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 pb-16 pt-12 sm:px-8 md:pt-20 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[1fr_auto_1fr] lg:gap-12 lg:pb-24">
      <div className="order-2 lg:order-1">
        <h1 className="text-[clamp(3.2rem,7vw,6.2rem)] font-extrabold leading-[0.9] tracking-[-0.05em] text-bone">
          <span className="rise block" style={{ animationDelay: "150ms" }}>Hi, I&apos;m</span>
          <span className="rise block" style={{ animationDelay: "260ms" }}>Zaid.</span>
        </h1>
        <p className="rise mt-6 max-w-xs text-2xl font-bold leading-tight tracking-tight text-bone" style={{ animationDelay: "380ms" }}>
          Lead AI Engineer &amp; Full-Stack Developer.
        </p>
        <dl className="rise mt-10 space-y-0.5 text-sm text-mist" style={{ animationDelay: "480ms" }}>
          <dt className="text-dim">Currently</dt>
          <dd className="text-bone">Lead AI Engineer</dd>
          <dd>Maxnet Technologies, Pune</dd>
        </dl>
      </div>

      <div className="rise order-1 mx-auto lg:order-2" style={{ animationDelay: "300ms" }} onPointerMove={onMove} onPointerLeave={onLeave}>
        <div ref={card} className="relative h-[52vh] max-h-[520px] min-h-[340px] w-[min(78vw,400px)] overflow-hidden rounded-xl bg-[#e8e8e5]  transition-transform duration-300 ease-out will-change-transform lg:w-[360px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/zaid.webp" alt="Zaid Peerzade" className="h-full w-full object-cover object-top" />
          
        </div>
      </div>

      <div className="order-3">
        <p className="rise max-w-sm text-2xl font-semibold leading-snug tracking-tight text-bone sm:text-[1.7rem]" style={{ animationDelay: "560ms" }}>
          I build RAG pipelines and AI agents that automate repetitive workflows, saving hours of manual work.
        </p>
        <div className="rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "660ms" }}>
          <a href="#work" className="group inline-flex items-center gap-2 rounded-full bg-bone px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-white">
            Explore projects
          </a>
          <button onClick={() => askAI()} className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-bone transition hover:border-bone">
            <Sparkles className="h-4 w-4" /> Ask my AI
          </button>
        </div>
      </div>
    </section>
  );
}
