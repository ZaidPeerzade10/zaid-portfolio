import { experiences } from "@/lib/data.tsx";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 md:py-32 bg-card/50">
      <div className="container mx-auto">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-16">
          Work Experience
        </h2>
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-border hidden md:block"></div>

          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`mb-8 flex justify-between items-center w-full ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="hidden md:block w-5/12"></div>
              <div className="z-10 hidden md:block">
                <div className="h-6 w-6 rounded-full bg-primary shadow-glow-primary flex items-center justify-center">
                   <exp.icon className="h-4 w-4 text-primary-foreground" />
                </div>
              </div>
              <div className="w-full md:w-5/12">
                <Card className="shadow-lg hover:shadow-glow-primary/50 transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl text-primary">{exp.title}</CardTitle>
                        <CardDescription className="mt-1 font-semibold">{exp.company} &bull; {exp.location || exp.duration}</CardDescription>
                        {exp.location && <CardDescription className="text-sm">{exp.duration}</CardDescription>}
                      </div>
                      <div className="hidden sm:block p-2 bg-secondary rounded-full">
                        <exp.icon className="h-6 w-6 text-primary"/>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                      {exp.description.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
