"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "pointer-events-none fixed top-0 left-0 w-full h-full -z-10",
        className
      )}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,hsl(var(--background)),hsl(var(--background))_70%,transparent_100%)]"></div>
      <div className="absolute inset-0 h-full w-full bg-[radial-gradient(circle_farthest-side_at_100%_0,hsl(var(--primary)/0.1),transparent_40%),radial-gradient(circle_farthest-side_at_0_100%,hsl(var(--accent)/0.1),transparent_40%)]"></div>
    </div>
  );
};
