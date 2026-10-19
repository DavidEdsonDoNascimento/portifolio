import { Briefcase, GraduationCap, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { education } from "@/data/education";
import { skills } from "@/data/skills";

const focusAreas = [
  {
    title: "Product engineering",
    text: "Web and mobile applications, from architecture to delivery.",
  },
  {
    title: "Backend & integrations",
    text: "APIs, messaging and connections between third-party systems.",
  },
  {
    title: "Real-time systems",
    text: "Event-driven communication and WebSockets.",
  },
  {
    title: "Technical leadership",
    text: "Leading a squad and working with multidisciplinary teams.",
  },
];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="border-border border-t px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="about-title" eyebrow="04 / About" title="About me" />

        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <div>
            <div className="space-y-5 text-lg leading-relaxed text-pretty">
              <p>
                I&apos;m a Senior Full Stack Software Engineer based in Santa Catarina, Brazil,
                with over 10 years of experience building web applications, enterprise
                platforms and custom software.
              </p>
              <p className="text-muted">
                My work spans frontend engineering, backend architecture, real-time
                integrations and business automation. I&apos;ve also led a squad technically and
                worked closely with multidisciplinary teams.
              </p>
              <p className="text-muted">
                I&apos;ve contributed to projects across retail, logistics, geospatial systems and
                AI-powered SaaS products, pairing technical depth with a practical approach to
                business problems and turning operational challenges into well-designed products.
              </p>
            </div>

            <ul className="mt-10 grid gap-3 sm:grid-cols-2" aria-label="Focus areas">
              {focusAreas.map((area) => (
                <li key={area.title} className="border-border bg-surface rounded-xl border p-5">
                  <h3 className="font-display text-base font-semibold">{area.title}</h3>
                  <p className="text-muted mt-1.5 text-sm leading-relaxed">{area.text}</p>
                </li>
              ))}
            </ul>
          </div>

          <aside className="border-border bg-surface h-fit rounded-2xl border p-6 sm:p-7">
            <p className="font-display text-lg font-semibold">{siteConfig.owner.fullName}</p>
            <ul className="text-muted mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-primary shrink-0" aria-hidden />
                {siteConfig.owner.location}
              </li>
              <li className="flex items-center gap-3">
                <Briefcase size={16} className="text-primary shrink-0" aria-hidden />
                {siteConfig.owner.experience} in software development
              </li>
            </ul>

            <div className="border-border mt-6 border-t pt-6">
              <p className="text-muted mb-4 flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase">
                <GraduationCap size={14} aria-hidden /> Education
              </p>
              <ul className="space-y-4 text-sm">
                {education.map((item) => (
                  <li key={item.id}>
                    <p className="text-foreground/90 leading-snug">{item.degree}</p>
                    <p className="text-muted mt-1 text-xs">
                      {item.institution} · {item.period}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <div className="mt-20">
          <h3 className="font-display text-2xl font-semibold tracking-tight">Technical focus</h3>
          <p className="text-muted mt-2 max-w-xl text-sm">
            The tools I use most, grouped by area.
          </p>
          <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {skills.map((group) => (
              <li
                key={group.id}
                className="border-border bg-surface hover:border-primary/30 rounded-2xl border p-6 transition-colors duration-200"
              >
                <h4 className="text-primary font-mono text-[11px] tracking-widest uppercase">
                  {group.title}
                </h4>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${group.title} skills`}>
                  {group.items.map((item) => (
                    <li key={item}>
                      <Badge>{item}</Badge>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
