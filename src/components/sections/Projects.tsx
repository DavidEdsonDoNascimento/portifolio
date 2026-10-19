import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section id="work" aria-labelledby="work-title" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="work-title"
          eyebrow="01 / Work"
          title="Selected Work"
          description="Placeholder cards. Case studies will be refined and published in a later stage."
        />
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.id}>
              <article className="border-border bg-surface hover:border-primary/40 group relative flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-300 motion-safe:hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_color-mix(in_srgb,var(--color-primary)_30%,transparent)]">
                <div
                  className="via-primary/60 pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />
                <div
                  className="bg-surface-elevated border-border relative aspect-[4/3] border-b"
                  aria-hidden="true"
                >
                  <div className="bg-grid absolute inset-0 opacity-60" />
                  <span className="border-border bg-surface text-muted absolute top-4 left-4 rounded-full border px-3 py-1 font-mono text-xs">
                    Draft
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-muted font-mono text-xs">{project.category}</p>
                  <h3 className="font-display mt-2 text-xl font-semibold tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-muted mt-3 flex-1 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tags">
                    {project.tags.map((tag) => (
                      <li key={tag}>
                        <Badge>{tag}</Badge>
                      </li>
                    ))}
                  </ul>
                  <p className="text-muted mt-5 inline-flex items-center gap-1 text-sm">
                    Case study coming soon <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
