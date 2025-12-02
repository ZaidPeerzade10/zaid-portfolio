import { certifications } from "@/lib/data.tsx";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const CertificationCard = ({ cert }: { cert: (typeof certifications)[0] }) => {
  return (
    <Card className="text-center p-4 flex flex-col items-center justify-center shadow-lg hover:shadow-primary/20 transition-shadow">
      <div className="p-3 bg-secondary rounded-full text-primary mb-3">
        <cert.icon className="h-6 w-6" />
      </div>
      <p className="font-semibold text-foreground flex-grow">{cert.name}</p>
      <p className="text-sm text-muted-foreground mt-1">{cert.provider}</p>
    </Card>
  );
};

export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-20 md:py-32 bg-card/50">
      <div className="container mx-auto">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-16">
          Certifications
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) =>
            cert.link ? (
              <Link
                key={index}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <CertificationCard cert={cert} />
              </Link>
            ) : (
              <CertificationCard key={index} cert={cert} />
            )
          )}
        </div>
      </div>
    </section>
  );
}
