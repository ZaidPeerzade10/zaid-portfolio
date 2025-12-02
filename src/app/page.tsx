import Header from '@/components/layout/header';
import HeroSection from '@/components/sections/hero';
import AboutSection from '@/components/sections/about';
import ExperienceSection from '@/components/sections/experience';
import SkillsSection from '@/components/sections/skills';
import ProjectsSection from '@/components/sections/projects';
import EducationSection from '@/components/sections/education';
import CertificationsSection from '@/components/sections/certifications';
import ContactSection from '@/components/sections/contact';
import Footer from '@/components/layout/footer';
import { BackgroundBeams } from '@/components/ui/background-beams';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <CertificationsSection />
        <ContactSection />
      </main>
      <Footer />
      <BackgroundBeams className="hidden md:block" />
    </div>
  );
}
