import { aboutData } from "@/lib/data.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-center">
          {aboutData.title}
        </h2>
        <div className="mt-12 max-w-3xl mx-auto">
           <p className="text-center text-lg md:text-xl text-muted-foreground leading-relaxed">
              {aboutData.description}
            </p>
        </div>
      </div>
    </section>
  );
}
