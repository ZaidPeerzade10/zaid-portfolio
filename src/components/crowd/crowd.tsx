"use client";

import { useEffect, useMemo, useRef } from "react";
import { ME, Person, makePerson, rng, type PersonSpec } from "./person";

type Placed = { p: PersonSpec; x: number; bottom: number; scale: number; row: number; delay: number; blink: number };

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
      const isMe = ri === 2 && Math.abs(x + 60 * r.scale - W / 2) < r.gap / 2;
      const p = isMe ? ME : makePerson(seed++);
      out.push({
        p,
        x: isMe ? W / 2 - 60 * 1.22 : x,
        bottom: r.bottom,
        scale: isMe ? 1.22 : r.scale * (0.95 + r2() * 0.1),
        row: ri,
        delay: r2() * 4,
        blink: 3 + r2() * 5,
      });
    }
  });
  return out;
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
      <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" className="block h-[260px] w-full sm:h-[360px] lg:h-[440px]" role="img" aria-label="An illustrated crowd of people with Zaid waving in the middle">
        <text x={W / 2} y={232} textAnchor="middle" className="crowd-name" fontSize={300} fontWeight={800} fill="#EDEDEB" letterSpacing={-12}>
          {name}
        </text>
        {people.map((it, i) => {
          const tx = it.x;
          const ty = it.bottom - 202 * it.scale;
          const faceCx = tx + 60 * it.scale;
          const faceCy = ty + 60 * it.scale;
          return (
            <g key={i} transform={`translate(${tx.toFixed(1)} ${ty.toFixed(1)}) scale(${it.scale.toFixed(3)})`}>
              <g
                className={`person ${it.p.me ? "is-me" : ""}`}
                style={{ animationDelay: `${it.delay.toFixed(2)}s`, ["--blink" as string]: `${it.blink.toFixed(2)}s` }}
              >
                <g data-face data-cx={faceCx.toFixed(1)} data-cy={faceCy.toFixed(1)} className="look">
                  <Person p={it.p} />
                </g>
                {it.p.me && (
                  <g className="me-tag">
                    <rect x={16} y={-10} width={88} height={28} rx={14} fill="#000000" />
                    <text x={60} y={9} textAnchor="middle" fontSize={13} fill="#fff" fontFamily="var(--font-geist), sans-serif" fontWeight={600}>
                      that&apos;s me
                    </text>
                    <path d="M 54 17 L 60 25 L 66 17 Z" fill="#000000" />
                  </g>
                )}
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
