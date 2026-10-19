import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  const t = useTranslations("projects");

  return (
    <section id="work" aria-labelledby="work-title" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="work-title"
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
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
