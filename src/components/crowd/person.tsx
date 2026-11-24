// Procedural black-and-white line-art people. Deterministic per seed, so the
// server and client render the same crowd.

export type PersonSpec = {
  seed: number;
  hair: "short" | "curly" | "long" | "bun" | "bald" | "cap" | "hijab" | "side" | "grey" | "ponytail";
  shirt: "tee" | "collar" | "hoodie" | "dark" | "stripes" | "kurta" | "jacket";
  mouth: "smile" | "grin" | "o" | "flat";
  glasses: boolean;
  beard: "none" | "full" | "stubble" | "mustache";
  earrings: boolean;
  headRx: number;
  headRy: number;
  shoulders: number;
  tilt: number;
  wave?: boolean;
  me?: boolean;
};

export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const pick = <T,>(r: () => number, xs: readonly T[]) => xs[Math.floor(r() * xs.length)];

export function makePerson(seed: number): PersonSpec {
  const r = rng(seed * 9973 + 17);
  const hair = pick(r, ["short", "short", "curly", "long", "long", "bun", "bald", "cap", "hijab", "side", "side", "grey", "ponytail"] as const);
  const femme = ["long", "bun", "hijab", "ponytail"].includes(hair);
  return {
    seed,
    hair,
    shirt: pick(r, ["tee", "tee", "collar", "hoodie", "dark", "dark", "stripes", "kurta", "jacket"] as const),
    mouth: pick(r, ["smile", "smile", "grin", "grin", "o", "flat"] as const),
    glasses: r() < 0.28,
    beard: femme ? "none" : pick(r, ["none", "none", "none", "full", "stubble", "mustache"] as const),
    earrings: femme && r() < 0.6,
    headRx: 21 + r() * 4,
    headRy: 25 + r() * 4,
    shoulders: 0.85 + r() * 0.3,
    tilt: (r() - 0.5) * 10,
  };
}

export const ME: PersonSpec = {
  seed: 1,
  hair: "side",
  shirt: "tee",
  mouth: "smile",
  glasses: false,
  beard: "stubble",
  earrings: false,
  headRx: 23,
  headRy: 27,
  shoulders: 1.02,
  tilt: 0,
  wave: true,
  me: true,
};

const S = { stroke: "#000000", strokeWidth: 2.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const INK = "#000000";
const PAPER = "#FFFFFF";

/** One person, drawn in a 120 x 200 box with the chin around y = 88. */
export function Person({ p, extend = false }: { p: PersonSpec; extend?: boolean }) {
  const cx = 60;
  const cy = 60;
  const { headRx: rx, headRy: ry } = p;
  const sw = 50 * p.shoulders;
  const dark = p.shirt === "dark" || p.shirt === "hoodie" || p.shirt === "jacket";
  const shirtFill = dark ? INK : PAPER;
  const detail = dark ? PAPER : INK;

  const body = `M ${cx - sw} 202 C ${cx - sw} 150, ${cx - sw * 0.7} 116, ${cx} 112 C ${cx + sw * 0.7} 116, ${cx + sw} 150, ${cx + sw} 202 Z`;

  return (
    <g className="person-inner">
      {/* hair that sits behind the head */}
      {p.hair === "long" && (
        <path d={`M ${cx - rx - 4} ${cy} C ${cx - rx - 8} ${cy + 40}, ${cx - rx} ${cy + 52}, ${cx - rx + 6} ${cy + 56} L ${cx + rx - 6} ${cy + 56} C ${cx + rx} ${cy + 52}, ${cx + rx + 8} ${cy + 40}, ${cx + rx + 4} ${cy} Z`} fill={INK} {...S} />
      )}
      {p.hair === "hijab" && (
        <path d={`M ${cx - rx - 9} ${cy + 4} C ${cx - rx - 12} ${cy - ry - 16}, ${cx + rx + 12} ${cy - ry - 16}, ${cx + rx + 9} ${cy + 4} C ${cx + rx + 12} ${cy + 40}, ${cx + sw * 0.8} ${cy + 56}, ${cx + sw * 0.7} ${cy + 64} L ${cx - sw * 0.7} ${cy + 64} C ${cx - sw * 0.8} ${cy + 56}, ${cx - rx - 12} ${cy + 40}, ${cx - rx - 9} ${cy + 4} Z`} fill={p.seed % 2 ? INK : PAPER} {...S} />
      )}
      {p.hair === "ponytail" && <path d={`M ${cx + rx - 2} ${cy - 10} C ${cx + rx + 18} ${cy - 6}, ${cx + rx + 16} ${cy + 26}, ${cx + rx + 6} ${cy + 34}`} fill="none" {...S} strokeWidth={9} />}

      {/* body */}
      <g className="torso">
        {extend && <path d={`M ${cx - sw} 198 L ${cx - sw} 640 M ${cx + sw} 198 L ${cx + sw} 640`} stroke={INK} strokeWidth={2.4} />}
        {extend && <rect x={cx - sw + 1.2} y={196} width={sw * 2 - 2.4} height={444} fill={shirtFill} />}
        <path d={extend ? body.replace(" Z", "") : body} fill={shirtFill} {...S} />
        {extend && (
          <path
            d={`M ${cx - sw * 0.7} 150 C ${cx - sw * 0.62} 190, ${cx - sw * 0.6} 240, ${cx - sw * 0.62} 300 M ${cx + sw * 0.7} 150 C ${cx + sw * 0.62} 190, ${cx + sw * 0.6} 240, ${cx + sw * 0.62} 300`}
            fill="none"
            stroke={detail}
            strokeWidth={2}
            strokeLinecap="round"
          />
        )}
        {p.shirt === "collar" && (
          <path d={`M ${cx - 14} 112 L ${cx} 128 L ${cx + 14} 112 M ${cx} 128 L ${cx} 202`} fill="none" {...S} />
        )}
        {p.shirt === "tee" && <path d={`M ${cx - 12} 113 Q ${cx} 124 ${cx + 12} 113`} fill="none" {...S} />}
        {p.shirt === "kurta" && (
          <>
            <path d={`M ${cx} 114 L ${cx} 146`} {...S} />
            <circle cx={cx} cy={124} r={1.6} fill={INK} />
            <circle cx={cx} cy={134} r={1.6} fill={INK} />
          </>
        )}
        {p.shirt === "stripes" &&
          [128, 144, 160, 176, 192].map((y) => (
            <path key={y} d={`M ${cx - sw + 4} ${y} L ${cx + sw - 4} ${y}`} {...S} strokeWidth={1.6} />
          ))}
        {p.shirt === "hoodie" && (
          <>
            <path d={`M ${cx - 20} 114 Q ${cx} 136 ${cx + 20} 114`} fill="none" stroke={detail} strokeWidth={2.2} />
            <path d={`M ${cx - 6} 128 L ${cx - 7} 150 M ${cx + 6} 128 L ${cx + 7} 150`} stroke={detail} strokeWidth={2} strokeLinecap="round" />
          </>
        )}
        {p.shirt === "jacket" && (
          <path d={`M ${cx - 10} 112 L ${cx - 4} 202 M ${cx + 10} 112 L ${cx + 4} 202 M ${cx - 10} 112 L ${cx} 140 L ${cx + 10} 112`} fill="none" stroke={detail} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        )}
        {p.shirt === "dark" && <path d={`M ${cx - 11} 113 Q ${cx} 122 ${cx + 11} 113`} fill="none" stroke={detail} strokeWidth={2} strokeLinecap="round" />}
      </g>

      {/* waving arm (only for the hero character) */}
      {p.wave && (
        <g className="wave-arm">
          <path d={`M ${cx + sw * 0.72} 160 C ${cx + sw + 8} 136, ${cx + sw + 16} 108, ${cx + sw + 12} 86`} fill="none" stroke={INK} strokeWidth={16} strokeLinecap="round" />
          <path d={`M ${cx + sw * 0.72} 160 C ${cx + sw + 8} 136, ${cx + sw + 16} 108, ${cx + sw + 12} 86`} fill="none" stroke={PAPER} strokeWidth={11} strokeLinecap="round" />
          <circle cx={cx + sw + 12} cy={78} r={9} fill={PAPER} {...S} />
          <path d={`M ${cx + sw + 6} 72 L ${cx + sw + 4} 64 M ${cx + sw + 12} 70 L ${cx + sw + 12} 61 M ${cx + sw + 18} 72 L ${cx + sw + 20} 64`} {...S} strokeWidth={2} />
        </g>
      )}

      {/* neck */}
      <path d={`M ${cx - 7} ${cy + ry - 6} L ${cx - 8} 114 Q ${cx} 118 ${cx + 8} 114 L ${cx + 7} ${cy + ry - 6}`} fill={PAPER} {...S} />

      <g className="head" style={{ transform: `rotate(${p.tilt}deg)`, transformOrigin: `${cx}px ${cy + ry}px` }}>
        {/* ears */}
        <ellipse cx={cx - rx} cy={cy + 3} rx={4.5} ry={6.5} fill={PAPER} {...S} />
        <ellipse cx={cx + rx} cy={cy + 3} rx={4.5} ry={6.5} fill={PAPER} {...S} />
        {p.earrings && (
          <>
            <circle cx={cx - rx} cy={cy + 13} r={2.4} fill={INK} />
            <circle cx={cx + rx} cy={cy + 13} r={2.4} fill={INK} />
          </>
        )}
        {/* face */}
        <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={PAPER} {...S} />

        {/* hair on top */}
        <Hair p={p} cx={cx} cy={cy} rx={rx} ry={ry} />

        {/* beard */}
        {p.beard === "full" && (
          <path d={`M ${cx - rx + 1} ${cy + 2} C ${cx - rx + 2} ${cy + ry + 6}, ${cx + rx - 2} ${cy + ry + 6}, ${cx + rx - 1} ${cy + 2} C ${cx + rx - 6} ${cy + 16}, ${cx + 8} ${cy + 12}, ${cx} ${cy + 14} C ${cx - 8} ${cy + 12}, ${cx - rx + 6} ${cy + 16}, ${cx - rx + 1} ${cy + 2} Z`} fill={INK} {...S} />
        )}
        {p.beard === "stubble" &&
          Array.from({ length: 14 }).map((_, i) => {
            const a = Math.PI * (0.15 + (0.7 * i) / 13);
            const x = cx + Math.cos(a) * (rx - 4);
            const y = cy + Math.sin(a) * (ry - 3);
            return <circle key={i} cx={x} cy={y} r={0.9} fill={INK} />;
          })}
        {(p.beard === "mustache" || p.beard === "full") && (
          <path d={`M ${cx - 8} ${cy + 13} Q ${cx} ${cy + 8} ${cx + 8} ${cy + 13}`} fill="none" stroke={p.beard === "full" ? PAPER : INK} strokeWidth={3} strokeLinecap="round" />
        )}

        <g className="face">
          {/* brows */}
          <path d={`M ${cx - 13} ${cy - 7} Q ${cx - 9} ${cy - 10} ${cx - 5} ${cy - 7}`} fill="none" {...S} strokeWidth={2} />
          <path d={`M ${cx + 5} ${cy - 7} Q ${cx + 9} ${cy - 10} ${cx + 13} ${cy - 7}`} fill="none" {...S} strokeWidth={2} />
          {/* eyes */}
          <g className="eyes" style={{ transformOrigin: `${cx}px ${cy}px` }}>
            <ellipse cx={cx - 9} cy={cy} rx={2.4} ry={2.9} fill={INK} />
            <ellipse cx={cx + 9} cy={cy} rx={2.4} ry={2.9} fill={INK} />
          </g>
          {p.glasses && (
            <g fill="none" {...S} strokeWidth={2}>
              <rect x={cx - 17} y={cy - 6} width={14} height={11} rx={4} />
              <rect x={cx + 3} y={cy - 6} width={14} height={11} rx={4} />
              <path d={`M ${cx - 3} ${cy - 1} L ${cx + 3} ${cy - 1}`} />
            </g>
          )}
          {/* nose */}
          <path d={`M ${cx + 1} ${cy + 2} Q ${cx + 4} ${cy + 8} ${cx} ${cy + 9}`} fill="none" {...S} strokeWidth={1.8} />
          {/* mouth */}
          {p.mouth === "smile" && <path d={`M ${cx - 7} ${cy + 15} Q ${cx} ${cy + 21} ${cx + 7} ${cy + 15}`} fill="none" stroke={p.beard === "full" ? PAPER : INK} strokeWidth={2.2} strokeLinecap="round" />}
          {p.mouth === "grin" && (
            <path d={`M ${cx - 8} ${cy + 14} Q ${cx} ${cy + 26} ${cx + 8} ${cy + 14} Z`} fill={p.beard === "full" ? PAPER : INK} stroke={p.beard === "full" ? PAPER : INK} strokeWidth={1.6} strokeLinejoin="round" />
          )}
          {p.mouth === "o" && <ellipse cx={cx} cy={cy + 17} rx={3} ry={3.6} fill={p.beard === "full" ? PAPER : INK} />}
          {p.mouth === "flat" && <path d={`M ${cx - 5} ${cy + 17} L ${cx + 5} ${cy + 16}`} stroke={p.beard === "full" ? PAPER : INK} strokeWidth={2.2} strokeLinecap="round" />}
        </g>
      </g>
    </g>
  );
}

function Hair({ p, cx, cy, rx, ry }: { p: PersonSpec; cx: number; cy: number; rx: number; ry: number }) {
  const top = cy - ry;
  switch (p.hair) {
    case "short":
    case "side":
    case "long":
    case "bun":
    case "ponytail": {
      const part = p.hair === "side" ? 8 : 0;
      const d = `M ${cx - rx - 1} ${cy - 2} C ${cx - rx - 3} ${top - 6}, ${cx + rx + 3} ${top - 8}, ${cx + rx + 1} ${cy - 2} C ${cx + rx - 3} ${cy - 14}, ${cx + part + 6} ${cy - 18}, ${cx + part - 2} ${cy - 15} C ${cx - 8} ${cy - 20}, ${cx - rx + 4} ${cy - 14}, ${cx - rx - 1} ${cy - 2} Z`;
      return (
        <>
          {p.hair === "bun" && <circle cx={cx} cy={top - 6} r={10} fill={INK} {...S} />}
          <path d={d} fill={INK} {...S} />
          {p.hair === "side" && <path d={`M ${cx + part - 2} ${cy - 15} C ${cx + 2} ${top + 2}, ${cx - 10} ${top + 2}, ${cx - rx + 4} ${cy - 8}`} fill="none" stroke={PAPER} strokeWidth={1.4} strokeLinecap="round" />}
        </>
      );
    }
    case "grey":
      return (
        <g>
          <path d={`M ${cx - rx - 1} ${cy - 4} C ${cx - rx - 2} ${top - 4}, ${cx + rx + 2} ${top - 6}, ${cx + rx + 1} ${cy - 4} C ${cx + rx - 4} ${cy - 13}, ${cx - rx + 4} ${cy - 13}, ${cx - rx - 1} ${cy - 4} Z`} fill={PAPER} {...S} />
          {[-12, -4, 4, 12].map((o) => (
            <path key={o} d={`M ${cx + o - 3} ${top + 3} Q ${cx + o} ${top + 8} ${cx + o + 3} ${cy - 12}`} fill="none" {...S} strokeWidth={1.3} />
          ))}
        </g>
      );
    case "curly":
      return (
        <g fill={INK} {...S}>
          {Array.from({ length: 11 }).map((_, i) => {
            const a = Math.PI * (1.02 + (0.96 * i) / 10);
            return <circle key={i} cx={cx + Math.cos(a) * (rx - 1)} cy={cy - 4 + Math.sin(a) * (ry - 2)} r={8} />;
          })}
          <ellipse cx={cx} cy={top + 9} rx={rx - 6} ry={9} />
        </g>
      );
    case "cap":
      return (
        <g>
          <path d={`M ${cx - rx - 1} ${cy - 6} C ${cx - rx} ${top - 8}, ${cx + rx} ${top - 8}, ${cx + rx + 1} ${cy - 6} Z`} fill={INK} {...S} />
          <path d={`M ${cx - rx - 2} ${cy - 6} L ${cx + rx + 18} ${cy - 6} Q ${cx + rx + 20} ${cy - 2} ${cx + rx + 10} ${cy - 1} L ${cx - rx} ${cy - 2} Z`} fill={INK} {...S} />
        </g>
      );
    case "hijab":
      return <path d={`M ${cx - rx + 1} ${cy - 3} C ${cx - rx + 2} ${top - 2}, ${cx + rx - 2} ${top - 2}, ${cx + rx - 1} ${cy - 3}`} fill="none" {...S} />;
    case "bald":
    default:
      return <path d={`M ${cx - rx + 6} ${top + 10} Q ${cx - rx + 10} ${top + 4} ${cx - rx + 16} ${top + 3}`} fill="none" {...S} strokeWidth={1.4} />;
  }
}
