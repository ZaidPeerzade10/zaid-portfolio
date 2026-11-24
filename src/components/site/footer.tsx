import { ArrowUpRight } from "lucide-react";
import { personalData } from "@/lib/data";
import { Crowd } from "@/components/crowd/crowd";
import { ContactForm } from "./contact-form";
import { LocalTime } from "./local-time";

export function Contact() {
  return (
    <section id="contact" className="mx-auto grid max-w-[1280px] gap-14 px-5 pb-24 sm:px-8 md:pb-32 lg:grid-cols-2">
      <div>
        <h2 className="text-[clamp(2.6rem,6vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.045em] text-bone">
          Got a workflow that should run itself?
        </h2>
        <p className="mt-6 max-w-md text-mist">
          Tell me what eats your team&apos;s time. I&apos;ll tell you honestly whether an agent can take it over.
        </p>
        <a href={`mailto:${personalData.email}`} className="mt-10 inline-block border-b border-bone pb-1 text-lg text-bone transition-colors hover:text-mist sm:text-2xl">
          {personalData.email}
        </a>
      </div>
      <div className="lg:pt-4">
        <ContactForm />
      </div>
    </section>
  );
}

const cols = [
  [
    { label: "Tech stack", href: "#stack" },
    { label: "Projects", href: "#work" },
    { label: "Experience", href: "#experience" },
  ],
  [
    { label: "Resume", href: personalData.resumeUrl, ext: true },
    { label: "LinkedIn", href: personalData.social.linkedin, ext: true },
    { label: "GitHub", href: personalData.social.github, ext: true },
  ],
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-5 pb-10 pt-14 sm:px-8 md:grid-cols-[1.2fr_1fr_1fr_1.2fr]">
        <div>
          <p className="text-2xl font-bold tracking-tight text-bone">Zaid.</p>
          <p className="mt-2 text-sm text-mist">
            Lead AI Engineer
            <br />
            and full-stack developer
          </p>
        </div>
        {cols.map((c, i) => (
          <ul key={i} className="space-y-2 text-sm">
            {c.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...("ext" in l ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex items-center gap-1 text-bone transition-colors hover:text-mist"
                >
                  {l.label}
                  {"ext" in l && <ArrowUpRight className="h-3 w-3" />}
                </a>
              </li>
            ))}
          </ul>
        ))}
        <div className="text-sm">
          <a href={`mailto:${personalData.email}`} className="text-bone hover:text-mist">
            {personalData.email}
          </a>
          <p className="mt-2 text-mist">
            Pune, <LocalTime />
          </p>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1280px] items-end justify-between px-5 pb-6 sm:px-8">
        <p className="text-[clamp(2rem,5vw,3.6rem)] font-extrabold leading-none tracking-[-0.045em] text-bone">See you around.</p>
        <a href="#top" className="pb-1 text-sm text-mist transition-colors hover:text-bone">
          Back to top
        </a>
      </div>
      <Crowd />
      <div className="bg-white px-5 py-4 text-center text-xs text-black/50 sm:px-8">© {new Date().getFullYear()} Zaid Peerzade. Everyone here is welcome.</div>
    </footer>
  );
}
