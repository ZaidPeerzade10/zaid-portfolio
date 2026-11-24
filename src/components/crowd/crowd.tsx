import { rng } from "./person";

/*
  Footer "street": illustrated people walk past in three lanes at different
  depths while Zaid stands still in the middle. Pure CSS motion.
  Illustrations were generated as black-and-white line art and cut out.
*/

const SIZES: Record<string, [number, number]> = {
  p00: [177, 458], p01: [178, 463], p02: [192, 480], p03: [198, 452], p04: [204, 479], p05: [194, 437], p06: [177, 478],
  p07: [165, 408], p08: [206, 429], p09: [192, 409], p10: [192, 444], p11: [189, 396], p12: [178, 399], p13: [215, 431],
  p14: [189, 507], p15: [195, 466], p16: [191, 509], p17: [188, 453], p18: [196, 459], p19: [219, 501], p20: [163, 452],
};
const IDS = Object.keys(SIZES);

type Lane = { seed: number; count: number; h: number; bottom: number; gap: [number, number]; dur: number; dir: 1 | -1 };

// h and bottom are % of the footer height; gap is a multiple of a figure's width
const BACK: Lane = { seed: 3, count: 16, h: 50, bottom: 16, gap: [0.35, 0.9], dur: 80, dir: 1 };
const MID: Lane = { seed: 7, count: 14, h: 62, bottom: 2, gap: [0.5, 1.2], dur: 62, dir: -1 };
const FRONT: Lane = { seed: 13, count: 12, h: 88, bottom: -54, gap: [0.9, 1.8], dur: 46, dir: 1 };

function people(lane: Lane) {
  const r = rng(lane.seed);
  const pool = [...IDS].sort(() => r() - 0.5);
  return Array.from({ length: lane.count }, (_, i) => ({
    id: pool[i % pool.length],
    gap: lane.gap[0] + r() * (lane.gap[1] - lane.gap[0]),
    delay: r() * 0.8,
    step: 0.55 + r() * 0.2,
  }));
}

function LaneRow({ lane }: { lane: Lane }) {
  const list = people(lane);
  const strip = (copy: number) =>
    list.map((p, i) => {
      const [w, h] = SIZES[p.id];
      const ratio = w / h;
      return (
        <div
          key={`${copy}-${i}`}
          className="walker shrink-0"
          style={{
            height: "100%",
            aspectRatio: `${w} / ${h}`,
            marginRight: `calc(var(--crowd-h) * ${(lane.h / 100) * ratio * p.gap})`,
            animationDelay: `-${p.delay.toFixed(2)}s`,
            animationDuration: `${p.step.toFixed(2)}s`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/crowd/${p.id}.webp`} alt="" draggable={false} className="h-full w-full select-none" loading="lazy" />
        </div>
      );
    });
  return (
    <div className="pointer-events-none absolute left-0" style={{ height: `${lane.h}%`, bottom: `${lane.bottom}%` }}>
      <div className={`lane flex h-full w-max items-end ${lane.dir === 1 ? "lane-right" : "lane-left"}`} style={{ animationDuration: `${lane.dur}s` }}>
        {strip(0)}
        {strip(1)}
      </div>
    </div>
  );
}

export function Crowd({ name = "ZAID." }: { name?: string }) {
  return (
    <div className="crowd relative h-[var(--crowd-h)] overflow-hidden bg-white" role="img" aria-label="Zaid standing still while illustrated people walk past">
      <p aria-hidden className="crowd-name pointer-events-none absolute inset-x-0 top-[4%] select-none text-center text-[clamp(7rem,24vw,22rem)] font-extrabold leading-none tracking-[-0.06em] text-[#EDEDEB]">
        {name}
      </p>
      <LaneRow lane={BACK} />
      <LaneRow lane={MID} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/zaid-standing.webp" alt="" className="zaid-standing pointer-events-none absolute bottom-[-2%] left-1/2 h-[78%] w-auto -translate-x-1/2" />
      <LaneRow lane={FRONT} />
    </div>
  );
}
