"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navLinks, personalData } from "@/lib/data.tsx";
import { cn } from "@/lib/utils";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeSheet = () => setIsSheetOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between">
        <Link href="#" className="font-headline text-2xl font-bold text-primary">
          {personalData.name.split(' ')[0]}
          <span className="text-foreground">.</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full bg-background">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between border-b pb-4">
                  <Link href="#" className="font-headline text-2xl font-bold text-primary" onClick={closeSheet}>
                     {personalData.name.split(' ')[0]}
                     <span className="text-foreground">.</span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={closeSheet}>
                    <X />
                  </Button>
                </div>
                <nav className="flex flex-col items-center gap-8 mt-16">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-2xl font-medium text-muted-foreground transition-colors hover:text-primary"
                      onClick={closeSheet}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
