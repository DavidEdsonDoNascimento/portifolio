import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ArchitecturePanel } from "./ArchitecturePanel";

const stack = ["TypeScript", "React", "Next.js", "Node.js", "NestJS"];

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative overflow-hidden px-6 pt-20 pb-24 sm:pt-28 lg:pb-32"
    >
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-primary mb-5 font-mono text-xs tracking-widest uppercase">
            Senior Full Stack Software Engineer
          </p>
          <h1
            id="hero-title"
            className="font-display text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl"
          >
            Building complex systems. Making them feel simple.
          </h1>
          <p className="text-muted mt-6 max-w-xl text-lg leading-relaxed">
            I build scalable applications, real-time integrations, and thoughtful
            digital experiences.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="#work">
              Explore My Work <ArrowRight size={16} aria-hidden />
            </ButtonLink>
            <ButtonLink href="#contact" variant="ghost">
              Get in Touch
            </ButtonLink>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2" aria-label="Core technologies">
            {stack.map((item) => (
              <li key={item} className="text-muted font-mono text-xs">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <ArchitecturePanel />
      </div>
    </section>
  );
}
