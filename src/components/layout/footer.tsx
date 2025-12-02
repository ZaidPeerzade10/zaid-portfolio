import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { personalData } from "@/lib/data.tsx";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="w-full bg-background border-t border-border mt-20 py-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-4">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {personalData.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href={personalData.social.linkedin} target="_blank" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href={personalData.social.github} target="_blank" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href={`mailto:${personalData.email}`} aria-label="Email">
              <Mail className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
