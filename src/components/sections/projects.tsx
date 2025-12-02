"use client";

import { projects } from "@/lib/data.tsx";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 md:py-32 bg-card/50">
      <div className="container mx-auto">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-16">
          My Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="flex flex-col shadow-lg hover:shadow-glow-primary/50 transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-secondary rounded-full text-primary">
                    <project.icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{project.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
