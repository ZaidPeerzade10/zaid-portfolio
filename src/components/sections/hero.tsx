"use client";

import Link from "next/link";
import { Linkedin, Send, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { personalData } from "@/lib/data.tsx";
import { TypingAnimation } from "@/components/ui/typing-animation";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex items-center justify-center min-h-[calc(100vh-5rem)]"
    >
      <div className="container mx-auto text-center z-10">
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            {personalData.name}
          </span>
        </h1>
        <div className="mt-4 text-xl md:text-2xl font-medium text-primary h-8">
          <TypingAnimation texts={personalData.roles} />
        </div>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
          {personalData.tagline}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" asChild className="shadow-glow-primary hover:shadow-lg hover:shadow-primary/40 transition-shadow">
            <a href={personalData.resumeUrl} target="_blank" rel="noopener noreferrer">
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#contact">
              <Send className="mr-2 h-5 w-5" />
              Contact Me
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
