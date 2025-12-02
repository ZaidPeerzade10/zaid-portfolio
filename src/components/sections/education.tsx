import { education } from "@/lib/data.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EducationSection() {
  return (
    <section id="education" className="py-20 md:py-32">
      <div className="container mx-auto">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-16">
          Education
        </h2>
        <div className="max-w-2xl mx-auto space-y-6">
          {education.map((edu, index) => (
            <Card key={index} className="shadow-lg">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-3 bg-secondary rounded-full text-primary">
                  <edu.icon className="h-8 w-8" />
                </div>
                <div>
                  <CardTitle className="text-xl">{edu.degree}</CardTitle>
                  <p className="text-muted-foreground font-semibold mt-1">{edu.university}</p>
                  <p className="text-muted-foreground">{edu.duration}</p>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
