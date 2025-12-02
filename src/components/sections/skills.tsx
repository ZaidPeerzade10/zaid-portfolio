"use client";

import { skills } from "@/lib/data.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedSkillBar } from "@/components/ui/animated-skill-bar";

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 md:py-32">
      <div className="container mx-auto">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-16">
          Technical Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, skillList]) => (
            <Card key={category} className="shadow-lg hover:shadow-primary/20 transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl text-primary">{category}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {skillList.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="text-primary">{skill.icon}</div>
                        <span className="font-medium text-foreground">{skill.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <AnimatedSkillBar level={skill.level} />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
