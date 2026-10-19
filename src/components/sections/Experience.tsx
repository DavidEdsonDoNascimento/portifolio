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
          title="Professional timeline"
          description="Placeholder structure. Roles, dates and highlights will be added later."
        />
        <ol className="border-border relative ml-2 space-y-10 border-l">
          {experience.map((entry) => (
            <li key={entry.id} className="relative pl-8">
              <span
                className="bg-background border-primary absolute top-1.5 -left-[7px] size-3 rounded-full border-2"
                aria-hidden="true"
              />
              <p className="text-muted font-mono text-xs">{entry.period}</p>
              <h3 className="font-display mt-1 text-lg font-semibold">
                {entry.role} <span className="text-muted font-normal">· {entry.company}</span>
              </h3>
              <p className="text-muted mt-2 max-w-2xl text-sm leading-relaxed">
                {entry.summary}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
