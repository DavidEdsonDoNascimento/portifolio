import { Briefcase, GraduationCap, MapPin } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { education } from "@/data/education";
import { skills } from "@/data/skills";
import { intlLocale, type Locale } from "@/i18n/routing";
import { formatMonthYear } from "@/lib/format";

const focusAreas = ["product", "backend", "realtime", "leadership"] as const;

export function About() {
  const t = useTranslations("about");
  const tTech = useTranslations("tech");
  const locale = useLocale() as Locale;
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="border-border border-t px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="about-title" eyebrow={t("eyebrow")} title={t("title")} />

        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <div>
            <div className="space-y-5 text-lg leading-relaxed text-pretty">
              {paragraphs.map((text, index) => (
                <p key={index} className={index === 0 ? "" : "text-muted"}>
                  {text}
                </p>
              ))}
            </div>

            <ul className="mt-10 grid gap-3 sm:grid-cols-2" aria-label={t("focusLabel")}>
              {focusAreas.map((area) => (
                <li key={area} className="border-border bg-surface rounded-xl border p-5">
                  <h3 className="font-display text-base font-semibold">{t(`focus.${area}.title`)}</h3>
                  <p className="text-muted mt-1.5 text-sm leading-relaxed">
                    {t(`focus.${area}.text`)}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <aside className="border-border bg-surface h-fit rounded-2xl border p-6 sm:p-7">
            <p className="font-display text-lg font-semibold">{siteConfig.owner.fullName}</p>
            <ul className="text-muted mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-primary shrink-0" aria-hidden />
                {t("facts.location")}
              </li>
              <li className="flex items-center gap-3">
                <Briefcase size={16} className="text-primary shrink-0" aria-hidden />
                {t("facts.experience")}
              </li>
            </ul>

            <div className="border-border mt-6 border-t pt-6">
              <p className="text-muted mb-4 flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase">
                <GraduationCap size={14} aria-hidden /> {t("education.title")}
              </p>
              <ul className="space-y-4 text-sm">
                {education.map((item) => (
                  <li key={item.id}>
                    <p className="text-foreground/90 leading-snug">
                      {t(`education.items.${item.id}.degree`)}
                    </p>
                    <p className="text-muted mt-1 text-xs">
                      {item.institution} ·{" "}
                      {item.inProgressSince
                        ? t("education.inProgressSince", {
                            date: formatMonthYear(intlLocale[locale], item.inProgressSince),
                          })
                        : item.completedYear}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <div className="mt-20">
          <h3 className="font-display text-2xl font-semibold tracking-tight">
            {t("skills.title")}
          </h3>
          <p className="text-muted mt-2 max-w-xl text-sm">{t("skills.description")}</p>
          <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {skills.map((group) => {
              const title = t(`skills.groups.${group.id}`);
              return (
                <li
                  key={group.id}
                  className="border-border bg-surface hover:border-primary/30 rounded-2xl border p-6 transition-colors duration-200"
                >
                  <h4 className="text-primary font-mono text-[11px] tracking-widest uppercase">
                    {title}
                  </h4>
                  <ul
                    className="mt-4 flex flex-wrap gap-2"
                    aria-label={t("skills.groupLabel", { group: title })}
                  >
                    {group.items.map((item) => {
                      const label = typeof item === "string" ? item : tTech(item.key);
                      return (
                        <li key={label}>
                          <Badge>{label}</Badge>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
