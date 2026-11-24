import { ArrowUpRight, ArrowDown } from "lucide-react";
import {
  about,
  certifications,
  education,
  experiences,
  navLinks,
  personalData,
  projects,
  stack,
} from "@/lib/data";
import { AgentLog } from "@/components/site/agent-log";
import { ContactForm } from "@/components/site/contact-form";
import { LocalTime } from "@/components/site/local-time";
import { Reveal } from "@/components/site/reveal";

function SectionLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="mb-10 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
      <span className="text-signal">{n}</span>
      <span>{children}</span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

const ticker = [
  "Python", "LangChain", "RAG", "FastAPI", "AutoGen", "Vector DBs", "OpenAI API", "UiPath", "SQL", "TypeScript", "GitHub Actions",
];

export default function Home() {
  const name = personalData.name.split(" ");
  return (
    <div className="grain min-h-screen">
      {/* nav */}
      <header className="sticky top-0 z-40 border-b border-line/70 bg-ink/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-3 font-mono text-sm text-bone">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-signal text-xs font-semibold text-ink">ZP</span>
            <span className="hidden sm:inline">zaid peerzade</span>
          </a>
          <nav className="hidden items-center gap-8 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground md:flex">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="transition-colors hover:text-bone">
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href={personalData.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 font-mono text-xs text-bone transition hover:border-signal hover:text-signal"
          >
            Resume <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      <main id="top">
        {/* hero */}
        <section className="mx-auto grid max-w-[1200px] items-center gap-14 px-6 pb-20 pt-16 md:pt-24 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <p className="rise font-mono text-xs uppercase tracking-[0.18em] text-signal" style={{ animationDelay: "50ms" }}>
              AI Engineer — Pune, India
            </p>
            <h1 className="mt-6 text-[clamp(3.6rem,10vw,8.5rem)] font-semibold leading-[0.88] tracking-[-0.045em] text-bone">
              {name.map((word, w) => (
                <span key={w} className="block">
                  {word.split("").map((ch, i) => (
                    <span key={i} className="rise inline-block" style={{ animationDelay: `${150 + (w * 5 + i) * 40}ms` }}>
                      {ch}
                    </span>
                  ))}
                </span>
              ))}
            </h1>
            <div className="wipe mt-6 h-[3px] w-40 bg-signal" style={{ animationDelay: "750ms" }} />
            <p className="rise mt-8 max-w-xl font-serif text-[clamp(1.9rem,3.6vw,2.9rem)] italic leading-[1.1] text-bone" style={{ animationDelay: "850ms" }}>
              I build <span className="text-signal">agents</span> that do the actual work.
            </p>
            <p className="rise mt-6 max-w-lg text-base leading-relaxed text-muted-foreground" style={{ animationDelay: "950ms" }}>
              Chatbots, retrieval systems and automation pipelines, built with Python and LangChain and tested until they
              hold up in production.
            </p>
            <div className="rise mt-10 flex flex-wrap items-center gap-3" style={{ animationDelay: "1050ms" }}>
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 text-sm font-medium text-ink transition hover:bg-bone"
              >
                See selected work
                <ArrowDown className="h-4 w-4 transition group-hover:translate-y-0.5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm text-bone transition hover:border-bone"
              >
                Get in touch
              </a>
            </div>
          </div>
          <div className="rise" style={{ animationDelay: "400ms" }}>
            <AgentLog />
          </div>
        </section>

        {/* ticker */}
        <div className="overflow-hidden border-y border-line py-5">
          <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-mono text-sm uppercase tracking-[0.16em] text-muted-foreground">
            {[...ticker, ...ticker].map((t, i) => (
              <span key={i} className="flex items-center gap-10">
                {t}
                <span className="text-signal">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* about */}
        <section className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
          <SectionLabel n="00">About</SectionLabel>
          <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
            <Reveal>
              <p className="font-serif text-[clamp(1.8rem,3.4vw,2.75rem)] leading-[1.15] text-bone">{about.statement}</p>
              <p className="mt-8 max-w-2xl leading-relaxed text-muted-foreground">{about.body}</p>
            </Reveal>
            <Reveal delay={120}>
              <dl className="divide-y divide-line border-y border-line">
                {about.facts.map((f) => (
                  <div key={f.label} className="flex items-baseline justify-between gap-6 py-4">
                    <dt className="font-mono text-xs uppercase tracking-[0.14em] text-dim">{f.label}</dt>
                    <dd className="text-right text-bone">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* work */}
        <section id="work" className="mx-auto max-w-[1200px] px-6 pb-24 md:pb-32">
          <SectionLabel n="01">Selected work</SectionLabel>
          <ul className="border-b border-line">
            {projects.map((p, i) => {
              const Row = (
                <div className="grid gap-4 py-8 md:grid-cols-[4rem_1fr_auto] md:gap-8 md:py-10">
                  <span className="font-mono text-sm text-dim transition-colors group-hover:text-signal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h3 className="text-3xl font-semibold tracking-[-0.02em] text-bone transition-transform duration-500 group-hover:translate-x-1 md:text-4xl">
                        {p.title}
                      </h3>
                      <span className="font-serif text-xl italic text-muted-foreground">{p.tagline}</span>
                    </div>
                    <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{p.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.stack.map((s) => (
                        <span key={s} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted-foreground">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-start gap-3 md:flex-col md:items-end">
                    <span className="font-mono text-xs uppercase tracking-[0.14em] text-dim">{p.kind}</span>
                    {p.href ? (
                      <span className="inline-flex items-center gap-1 font-mono text-xs text-signal">
                        view code <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    ) : (
                      <span className="font-mono text-xs text-dim">client work</span>
                    )}
                  </div>
                </div>
              );
              return (
                <Reveal as="li" key={p.title} delay={i * 60} className="group border-t border-line transition-colors hover:bg-panel/60">
                  {p.href ? (
                    <a href={p.href} target="_blank" rel="noopener noreferrer" className="block">
                      {Row}
                    </a>
                  ) : (
                    Row
                  )}
                </Reveal>
              );
            })}
          </ul>
        </section>

        {/* experience */}
        <section id="experience" className="mx-auto max-w-[1200px] px-6 pb-24 md:pb-32">
          <SectionLabel n="02">Experience</SectionLabel>
          <ol className="space-y-4">
            {experiences.map((e, i) => (
              <Reveal as="li" key={e.company} delay={i * 80}>
                <div className="grid gap-4 rounded-2xl border border-line bg-panel/50 p-6 md:grid-cols-[12rem_1fr] md:p-8">
                  <div className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    <div className="flex items-center gap-2">
                      {e.current && <span className="h-2 w-2 rounded-full bg-signal" />}
                      {e.period}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold tracking-[-0.01em] text-bone">
                      {e.role} <span className="font-serif font-normal italic text-muted-foreground">at {e.company}</span>
                    </h3>
                    <ul className="mt-4 space-y-2">
                      {e.points.map((pt) => (
                        <li key={pt} className="flex gap-3 leading-relaxed text-muted-foreground">
                          <span className="mt-[0.2rem] font-mono text-signal">›</span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* stack */}
        <section id="stack" className="mx-auto max-w-[1200px] px-6 pb-24 md:pb-32">
          <SectionLabel n="03">Stack</SectionLabel>
          <div className="grid gap-4 md:grid-cols-3">
            {stack.map((g, i) => (
              <Reveal key={g.group} delay={i * 80} className="rounded-2xl border border-line p-6 md:p-8">
                <h3 className="font-serif text-3xl italic text-bone">{g.group}</h3>
                <ul className="mt-6 space-y-3 font-mono text-sm">
                  {g.items.map((it) => (
                    <li key={it} className="flex items-center justify-between border-b border-line/70 pb-3 text-muted-foreground">
                      {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-4 grid gap-4 md:grid-cols-[1fr_2fr]">
            <div className="rounded-2xl border border-line p-6 md:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-dim">Education</p>
              <ul className="mt-4 space-y-5">
                {education.map((e) => (
                  <li key={e.degree}>
                    <p className="text-lg font-semibold text-bone">{e.degree}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{e.school}</p>
                    <p className="mt-1 font-mono text-xs text-dim">{e.years}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line p-6 md:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-dim">Certifications</p>
              <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                {certifications.map((c) => (
                  <li key={c.name} className="text-sm">
                    <a href={c.link} target="_blank" rel="noopener noreferrer" className="group text-muted-foreground transition-colors hover:text-bone">
                      <span className="mr-2 font-mono text-signal">›</span>
                      {c.name} <span className="font-mono text-xs text-dim group-hover:text-signal">{c.provider} ↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>

        {/* contact */}
        <section id="contact" className="border-t border-line">
          <div className="mx-auto grid max-w-[1200px] gap-16 px-6 py-24 md:py-32 lg:grid-cols-2">
            <Reveal>
              <SectionLabel n="04">Contact</SectionLabel>
              <h2 className="font-serif text-[clamp(2.6rem,5.5vw,4.5rem)] italic leading-[1.02] text-bone">
                Got a workflow that should <span className="text-signal">run itself?</span>
              </h2>
              <a
                href={`mailto:${personalData.email}`}
                className="mt-10 inline-block border-b border-line pb-1 font-mono text-base text-bone transition hover:border-signal hover:text-signal sm:text-lg"
              >
                {personalData.email}
              </a>
              <div className="mt-8 flex gap-6 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                <a href={personalData.social.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-bone">
                  LinkedIn <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <a href={personalData.social.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-bone">
                  GitHub <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </Reveal>
            <Reveal delay={120} className="lg:pt-20">
              <ContactForm />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-6 py-8 font-mono text-xs text-dim sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Zaid Peerzade</span>
          <span>
            Pune, IN · <LocalTime />
          </span>
          <a href="#top" className="hover:text-bone">
            back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
