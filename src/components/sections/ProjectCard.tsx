import { ArrowUpRight, Lock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { Project } from "@/types/content";
import { ProjectVisual } from "./ProjectVisual";

export function ProjectCard({ project }: { project: Project }) {
  const { featured, link } = project;
  const titleId = `project-${project.id}`;

  return (
    <article
      aria-labelledby={titleId}
      className={`border-border bg-surface hover:border-primary/40 group relative flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-300 motion-safe:hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_color-mix(in_srgb,var(--color-primary)_30%,transparent)] ${
        featured ? "lg:flex-row" : ""
      }`}
    >
      <div
        className="via-primary/60 pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />

      {/* illustration */}
      <div
        className={`@container bg-surface-elevated border-border relative border-b ${
          featured ? "lg:w-[46%] lg:shrink-0 lg:border-r lg:border-b-0" : ""
        }`}
        aria-hidden="true"
      >
        <div className={`relative aspect-[4/3] sm:aspect-[8/5] ${featured ? "lg:aspect-auto lg:h-full lg:min-h-[22rem]" : ""}`}>
          <div className="bg-grid absolute inset-0 opacity-50" />
          <div className="absolute inset-0 px-5 pt-14 pb-5 sm:px-7 sm:pb-7">
            <ProjectVisual kind={project.visual} />
          </div>
          <span className="border-border bg-surface/90 text-muted absolute top-4 left-4 rounded-full border px-3 py-1 font-mono text-[11px]">
            {project.visualCaption}
          </span>
        </div>
      </div>

      {/* content */}
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="text-primary/90 font-mono text-[11px] tracking-widest uppercase">
          {project.category}
        </p>
        <h3
          id={titleId}
          className={`font-display mt-3 font-semibold tracking-tight text-balance ${
            featured ? "text-2xl sm:text-3xl" : "text-2xl"
          }`}
        >
          {project.title}
        </h3>
        <p className="text-muted mt-1 text-sm">{project.context}</p>

        <p className="text-muted mt-5 leading-relaxed text-pretty">{project.description}</p>

        <ul className="mt-6 space-y-2.5 text-sm">
          {project.highlights.map((item) => (
            <li key={item} className="text-foreground/85 flex gap-3 leading-relaxed">
              <span className="bg-primary mt-2 size-1.5 shrink-0 rounded-full" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>

        {project.technologies.length > 0 ? (
          <div className="mt-7">
            <p className="text-muted mb-3 font-mono text-[11px] tracking-widest uppercase">
              Technologies
            </p>
            <ul className="flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
              {project.technologies.map((tech) => (
                <li key={tech}>
                  <Badge>{tech}</Badge>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {link ? (
          <div className="mt-auto pt-8">
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group/link inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-200 ${
                link.kind === "public"
                  ? "border-primary/40 text-primary hover:bg-primary hover:text-background"
                  : "border-border text-muted hover:border-secondary/50 hover:text-foreground"
              }`}
            >
              {link.kind === "private" ? <Lock size={14} aria-hidden /> : null}
              {link.label}
              <ArrowUpRight
                size={14}
                className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                aria-hidden
              />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        ) : null}
      </div>
    </article>
  );
}
