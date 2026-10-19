import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  return (
    <section id="work" aria-labelledby="work-title" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="work-title"
          eyebrow="01 / Work"
          title="Selected Work"
          description="Three projects that show how I approach integrations, product engineering and business-focused software."
        />
        <ul className="grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <li key={project.id} className={project.featured ? "lg:col-span-2" : ""}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
