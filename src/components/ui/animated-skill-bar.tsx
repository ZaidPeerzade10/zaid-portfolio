"use client";

import { Progress } from "@/components/ui/progress";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";

type AnimatedSkillBarProps = {
  level: number;
};

export function AnimatedSkillBar({ level }: AnimatedSkillBarProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setProgress(level), 200);
      return () => clearTimeout(timer);
    }
  }, [inView, level]);

  return <Progress ref={ref} value={progress} className="h-2 bg-card" />;
}
