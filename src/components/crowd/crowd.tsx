"use client";

import { useEffect, useMemo, useRef } from "react";
import { Person, makePerson, rng, type PersonSpec } from "./person";

type Placed = { p: PersonSpec; x: number; bottom: number; scale: number; row: number; delay: number; blink: number; dur: number };

const W = 1600;
const H = 430;

function layout(): Placed[] {
  const rows = [
    { scale: 0.7, bottom: 300, gap: 60, offset: 4 },
    { scale: 0.84, bottom: 372, gap: 72, offset: 34 },
    { scale: 1, bottom: 452, gap: 90, offset: 0 },
  ];
  const out: Placed[] = [];
  let seed = 3;
  rows.forEach((r, ri) => {
    const r2 = rng(ri * 101 + 7);
    for (let x = r.offset - 30; x < W + 30; x += r.gap * (0.9 + r2() * 0.2)) {
      out.push({
        p: makePerson(seed++),
        x,
        bottom: r.bottom,
        scale: r.scale * (0.95 + r2() * 0.1),
        row: ri,
        delay: r2() * 3,
        blink: 3 + r2() * 5,
        dur: 2.2 + r2() * 2,
      });
    }
  });
  return out;
}


function renderPerson(it: Placed, i: number) {
  const tx = it.x;
  const ty = it.bottom - 202 * it.scale;
  const faceCx = tx + 60 * it.scale;
  const faceCy = ty + 60 * it.scale;
  return (
    <g key={`${it.row}-${i}`} transform={`translate(${tx.toFixed(1)} ${ty.toFixed(1)}) scale(${it.scale.toFixed(3)})`}>
      <g
        className="person"
        style={{ animationDelay: `-${it.delay.toFixed(2)}s`, animationDuration: `${it.dur.toFixed(2)}s`, ["--blink" as string]: `${it.blink.toFixed(2)}s` }}
      >
        <g data-face data-cx={faceCx.toFixed(1)} data-cy={faceCy.toFixed(1)} className="look">
          <Person p={it.p} />
        </g>
      </g>
    </g>
  );
}

export function Crowd({ name = "ZAID." }: { name?: string }) {
  const people = useMemo(layout, []);
  const svgRef = useRef<SVGSVGElement>(null);

  // faces gently turn toward the pointer
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const faces = Array.from(svg.querySelectorAll<SVGGElement>("[data-face]"));
    let raf = 0;
    let target: { x: number; y: number } | null = null;
    const apply = () => {
      raf = 0;
      faces.forEach((f) => {
        const cx = Number(f.dataset.cx);
        const cy = Number(f.dataset.cy);
        if (!target) {
          f.style.transform = "";
          return;
        }
        const dx = target.x - cx;
        const dy = target.y - cy;
        const d = Math.hypot(dx, dy) || 1;
        const k = Math.min(1, 260 / d);
        f.style.transform = `translate(${((dx / d) * 3.2 * k).toFixed(2)}px, ${((dy / d) * 2.4 * k).toFixed(2)}px)`;
      });
    };
    const onMove = (e: PointerEvent) => {
      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      const m = svg.getScreenCTM();
      if (!m) return;
      const p = pt.matrixTransform(m.inverse());
      target = { x: p.x, y: p.y };
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      target = null;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="crowd relative overflow-hidden bg-white">
      <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" className="block h-[260px] w-full sm:h-[360px] lg:h-[440px]" role="img" aria-label="Zaid standing in the middle of an illustrated crowd">
        <text x={W / 2} y={232} textAnchor="middle" className="crowd-name" fontSize={300} fontWeight={800} fill="#EDEDEB" letterSpacing={-12}>
          {name}
        </text>
        <defs>
          <filter id="ink-outline" x="-5%" y="-5%" width="110%" height="110%">
            <feMorphology in="SourceAlpha" operator="dilate" radius="3" result="grow" />
            <feFlood floodColor="#000" />
            <feComposite in2="grow" operator="in" result="outline" />
            <feMerge>
              <feMergeNode in="outline" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {people.filter((it) => it.row === 0).map(renderPerson)}
        <g className="standing">
          <image href="/zaid-standing.webp" x={W / 2 - 194} y={14} width={388} height={482} preserveAspectRatio="xMidYMin meet" filter="url(#ink-outline)" />
        </g>
        {people.filter((it) => it.row > 0 && !(it.row === 1 && Math.abs(it.x + 60 * it.scale - W / 2) < 120)).map(renderPerson)}
      </svg>
    </div>
  );
}
