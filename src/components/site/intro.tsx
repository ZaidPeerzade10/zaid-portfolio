"use client";

import { useEffect, useState } from "react";

/** Full-screen opening: a big title and the portrait, then the curtain lifts. Once per visit. */
export function Intro() {
  const [phase, setPhase] = useState<"show" | "leave" | "gone">("show");

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("zp-intro") === "1";
      sessionStorage.setItem("zp-intro", "1");
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) {
      setPhase("gone");
      return;
    }
    document.documentElement.style.overflow = "hidden";
    const t1 = setTimeout(() => setPhase("leave"), 2300);
    const t2 = setTimeout(() => {
      setPhase("gone");
      document.documentElement.style.overflow = "";
    }, 3200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (phase === "gone") return null;
  const skip = () => {
    setPhase("gone");
    document.documentElement.style.overflow = "";
  };

  const words = [
    { t: "<", cls: "font-mono font-light text-mist" },
    { t: "AI", cls: "" },
    { t: "ENGINEER", cls: "" },
    { t: "/>", cls: "font-mono font-light text-mist" },
  ];

  return (
    <div
      onClick={skip}
      className={`fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center overflow-hidden bg-ink ${
        phase === "leave" ? "[clip-path:inset(0_0_100%_0)]" : "[clip-path:inset(0_0_0_0)]"
      }`}
      style={{ transition: "clip-path .9s cubic-bezier(.77,0,.175,1)" }}
      aria-hidden
    >
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-x-[2vw] px-6 text-center mix-blend-difference text-[clamp(3rem,11vw,10rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.05em] text-bone">
        {words.map((w, i) => (
          <span key={i} className="overflow-hidden py-[0.06em]">
            <span className={`intro-word inline-block ${w.cls}`} style={{ animationDelay: `${120 + i * 110}ms` }}>
              {w.t}
            </span>
          </span>
        ))}
      </div>
      <div className="intro-photo mt-6 h-[22vh] w-[18vh] overflow-hidden rounded-md bg-[#e8e8e5] sm:absolute sm:left-1/2 sm:top-1/2 sm:mt-0 sm:h-[36vh] sm:w-[28vh] sm:-translate-x-1/2 sm:translate-y-[2%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/zaid.webp" alt="" className="h-full w-full object-cover" />
      </div>
      <span className="intro-meta absolute bottom-6 left-6 text-2xl font-bold tracking-tight text-bone sm:bottom-8 sm:left-8 sm:text-4xl">©2026</span>
      <span className="intro-meta absolute bottom-7 right-6 text-xs text-mist sm:bottom-10 sm:right-8 sm:text-sm">
        Zaid Peerzade, Lead AI Engineer in Pune
      </span>
    </div>
  );
}
