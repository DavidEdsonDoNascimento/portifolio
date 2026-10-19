import { useLocale, useTranslations } from "next-intl";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/data/experience";
import { intlLocale, type Locale } from "@/i18n/routing";
import { formatPeriod } from "@/lib/format";

export function Experience() {
  const t = useTranslations("experience");
  const tTech = useTranslations("tech");
  const locale = useLocale() as Locale;

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="border-border border-t px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="experience-title"
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />
        <ol className="border-border relative ml-2 space-y-8 border-l">
          {experience.map((entry) => {
            const key = `items.${entry.id}`;
            const highlights = t.raw(`${key}.highlights`) as string[];
            return (
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
                    <p className="text-muted font-mono text-xs">
                      {formatPeriod(intlLocale[locale], entry.period.start, entry.period.end)}
                    </p>
                  </div>
                  <p className="mt-1 text-sm">
                    <span className="text-primary">{t(`${key}.role`)}</span>
                    {t.has(`${key}.project`) ? (
                      <span className="text-muted"> · {t(`${key}.project`)}</span>
                    ) : null}
                  </p>

                  <ul className="mt-5 space-y-2.5 text-sm">
                    {highlights.map((item) => (
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
                      aria-label={t("technologiesOf", { company: entry.company })}
                    >
                      {entry.stack.map((tech) => {
                        const label = typeof tech === "string" ? tech : tTech(tech.key);
                        return (
                          <li key={label}>
                            <Badge>{label}</Badge>
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
