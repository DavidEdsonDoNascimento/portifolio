import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { InteractiveLab } from "@/components/sections/InteractiveLab";
import { Projects } from "@/components/sections/Projects";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Projects />
        <Experience />
        <InteractiveLab />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
