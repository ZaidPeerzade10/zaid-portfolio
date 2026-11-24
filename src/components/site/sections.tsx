import { certifications, education, experiences, stack } from "@/lib/data";

export function Stack() {
  return (
    <section id="stack" className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 md:py-32">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <h2 className="text-[clamp(2.6rem,6vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.045em] text-bone">Tech stack</h2>
        <p className="max-w-xs text-mist">The tools I reach for when an idea has to turn into something that runs every day.</p>
      </div>
      <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
        {stack.map((g, i) => (
          <div key={g.group} className={i === 1 ? "md:mt-16" : i === 2 ? "md:mt-32" : ""}>
            <div className="border-t border-bone pt-5">
              <h3 className="text-2xl font-bold leading-tight tracking-tight text-bone">{g.group}</h3>
              <p className="mt-2 text-sm text-mist">{g.blurb}</p>
            </div>
            <ul className="mt-6 flex flex-wrap gap-2">
              {g.items.map((it, k) => (
                <li
                  key={it}
                  className={`rounded-md border px-3 py-1.5 text-sm transition-colors duration-150 ${
                    k < 2 ? "border-bone bg-bone text-ink" : "border-line text-bone hover:border-bone"
                  }`}
                >
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-[1280px] px-5 pb-24 sm:px-8 md:pb-32">
      <h2 className="text-[clamp(2.6rem,6vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.045em] text-bone">Experience</h2>
      <ol className="mt-12">
        {experiences.map((e) => (
          <li key={e.company} className="grid gap-3 border-t border-line py-8 md:grid-cols-[14rem_1fr_1.2fr] md:gap-8">
            <p className="text-sm text-mist">
              {e.period}
              {e.current && <span className="ml-2 inline-block rounded-full bg-bone px-2 py-0.5 text-[11px] font-medium text-ink">Now</span>}
            </p>
            <div>
              <h3 className="text-xl font-bold tracking-tight text-bone">{e.role}</h3>
              <p className="text-mist">{e.company}</p>
            </div>
            <ul className="space-y-2 text-[15px] leading-relaxed text-mist">
              {e.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <div className="mt-20 grid gap-12 md:grid-cols-2">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-bone">Education</h3>
          <ul className="mt-6 space-y-6">
            {education.map((ed) => (
              <li key={ed.degree} className="border-t border-line pt-4">
                <p className="text-lg font-semibold text-bone">{ed.degree}</p>
                <p className="text-mist">{ed.school}</p>
                <p className="mt-1 text-sm text-dim">{ed.years}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-bone">Certifications</h3>
          <ul className="mt-6 border-t border-line">
            {certifications.map((c) => (
              <li key={c.name} className="border-b border-line">
                <a href={c.link} target="_blank" rel="noopener noreferrer" className="flex items-baseline justify-between gap-4 py-3 text-bone transition-colors hover:text-mist">
                  <span>{c.name}</span>
                  <span className="shrink-0 text-sm text-dim">{c.provider}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
