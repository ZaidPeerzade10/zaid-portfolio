import { Intro } from "@/components/site/intro";
import { Nav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { Stack, Experience } from "@/components/site/sections";
import { Projects } from "@/components/site/projects";
import { Contact, Footer } from "@/components/site/footer";
import { Chat } from "@/components/site/chat";

export default function Home() {
  return (
    <>
      <Intro />
      <Nav />
      <main>
        <Hero />
        <Stack />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <Chat />
    </>
  );
}
