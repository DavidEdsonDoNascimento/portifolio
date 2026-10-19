import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="border-border border-t px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="about-title" eyebrow="04 / About" title="About me" />
        <div className="border-border bg-surface max-w-3xl rounded-2xl border p-8">
          <p className="text-muted leading-relaxed">
            Professional introduction placeholder. A short, personal summary of my
            background, approach to engineering and the kind of problems I enjoy
            solving will be added here.
          </p>
        </div>
      </div>
    </section>
  );
}
