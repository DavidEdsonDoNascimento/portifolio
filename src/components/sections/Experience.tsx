import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="border-border border-t px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="experience-title"
          eyebrow="02 / Experience"
          title="Where I've worked"
          description="A decade of building software, from an internship in 2016 to senior backend and full stack roles."
        />
        <ol className="border-border relative ml-2 space-y-8 border-l">
          {experience.map((entry) => (
            <li key={entry.id} className="relative pl-6 sm:pl-8">
              <span
                className="bg-background border-primary absolute top-8 -left-[7px] size-3 rounded-full border-2"
                aria-hidden="true"
              />
              <article className="border-border bg-surface hover:border-primary/30 rounded-2xl border p-6 transition-colors duration-200 sm:p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="font-display text-xl font-semibold tracking-tight">
                    {entry.company}
                  </h3>
                  <p className="text-muted font-mono text-xs">{entry.period}</p>
                </div>
                <p className="mt-1 text-sm">
                  <span className="text-primary">{entry.role}</span>
                  {entry.project ? <span className="text-muted"> · {entry.project}</span> : null}
                </p>

                <ul className="mt-5 space-y-2.5 text-sm">
                  {entry.highlights.map((item) => (
                    <li key={item} className="text-foreground/85 flex gap-3 leading-relaxed">
                      <span
                        className="bg-primary/70 mt-2 size-1.5 shrink-0 rounded-full"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                {entry.stack ? (
                  <ul
                    className="mt-6 flex flex-wrap gap-2"
                    aria-label={`${entry.company} technologies`}
                  >
                    {entry.stack.map((tech) => (
                      <li key={tech}>
                        <Badge>{tech}</Badge>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
