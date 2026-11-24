import { Person, makePerson, rng } from "./person";

/*
  The footer "street": lanes of illustrated people walk past in both directions
  at different depths, while Zaid stands still in the middle. Pure CSS motion.
*/

const VH = 460; // viewBox height shared by every lane
const STRIP = 2600; // width of one strip; each lane renders it twice and loops

type Lane = { seed: number; scale: number; top: number; gap: [number, number]; dur: number; dir: 1 | -1 };

const BACK: Lane[] = [
  { seed: 11, scale: 0.6, top: 118, gap: [-22, 26], dur: 120, dir: 1 },
  { seed: 23, scale: 0.76, top: 168, gap: [-26, 34], dur: 90, dir: -1 },
];
const FRONT: Lane[] = [
  { seed: 37, scale: 0.98, top: 238, gap: [-30, 50], dur: 64, dir: 1 },
  { seed: 51, scale: 1.24, top: 318, gap: [-24, 80], dur: 48, dir: -1 },
];

function Strip({ lane }: { lane: Lane }) {
  const r = rng(lane.seed);
  const people: { x: number; seed: number; delay: number; step: number }[] = [];
  let x = 10;
  let seed = lane.seed * 100;
  while (x < STRIP - 120 * lane.scale) {
    people.push({ x, seed: seed++, delay: r() * 0.7, step: 0.55 + r() * 0.2 });
    x += 120 * lane.scale + lane.gap[0] + r() * (lane.gap[1] - lane.gap[0]);
  }
  return (
    <svg viewBox={`0 0 ${STRIP} ${VH}`} preserveAspectRatio="xMinYMax meet" className="h-full w-auto shrink-0" aria-hidden>
      {people.map((p, i) => (
        <g key={i} transform={`translate(${p.x.toFixed(1)} ${lane.top}) scale(${lane.scale})`}>
          <g className="walker" style={{ animationDelay: `-${p.delay.toFixed(2)}s`, animationDuration: `${p.step.toFixed(2)}s`, ["--blink" as string]: `${(3 + (i % 5)).toFixed(1)}s` }}>
            <Person p={{ ...makePerson(p.seed), tilt: 0 }} extend />
          </g>
        </g>
      ))}
    </svg>
  );
}

function LaneRow({ lane }: { lane: Lane }) {
  return (
    <div className="pointer-events-none absolute inset-y-0 left-0 overflow-visible">
      <div
        className={`lane flex h-full w-max ${lane.dir === 1 ? "lane-right" : "lane-left"}`}
        style={{ animationDuration: `${lane.dur}s` }}
      >
        <Strip lane={lane} />
        <Strip lane={lane} />
      </div>
    </div>
  );
}

export function Crowd({ name = "ZAID." }: { name?: string }) {
  return (
    <div className="crowd relative h-[300px] overflow-hidden bg-white sm:h-[400px] lg:h-[480px]" role="img" aria-label="Zaid standing still while a crowd of illustrated people walks past">
      <p aria-hidden className="crowd-name pointer-events-none absolute inset-x-0 top-[2%] select-none text-center text-[clamp(7rem,26vw,24rem)] font-extrabold leading-none tracking-[-0.06em] text-[#EDEDEB]">
        {name}
      </p>
      {BACK.map((l) => (
        <LaneRow key={l.seed} lane={l} />
      ))}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/zaid-standing.webp"
        alt=""
        className="zaid-standing pointer-events-none absolute bottom-[-4%] left-1/2 h-[100%] w-auto -translate-x-1/2"
      />
      {FRONT.map((l) => (
        <LaneRow key={l.seed} lane={l} />
      ))}
    </div>
  );
}
