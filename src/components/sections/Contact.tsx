import { ArrowUpRight, BriefcaseBusiness, Download, GitBranch, Mail } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { buttonClassName } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/routing";

const icons = {
  linkedin: BriefcaseBusiness,
  github: GitBranch,
  email: Mail,
} as const;

export function Contact() {
  const t = useTranslations("contact");
  const tCommon = useTranslations("common");
  const locale = useLocale() as Locale;

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="border-border min-h-[calc(100svh-12rem)] border-t px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="contact-title"
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />
        <ul className="grid gap-4 sm:grid-cols-3">
          {siteConfig.contact.map((item) => {
            const Icon = icons[item.id];
            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="border-border bg-surface hover:border-primary/50 group flex h-full flex-col justify-between gap-8 rounded-2xl border p-6 transition-all duration-200 motion-safe:hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between">
                    <Icon size={20} className="text-primary" aria-hidden />
                    <ArrowUpRight
                      size={18}
                      className="text-muted group-hover:text-primary transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </div>
                  <div>
                    <p className="font-display text-lg font-semibold">{t(`labels.${item.id}`)}</p>
                    <p className="text-muted mt-1 font-mono text-xs break-all">{item.value}</p>
                  </div>
                  {item.external ? (
                    <span className="sr-only">{tCommon("opensInNewTab")}</span>
                  ) : null}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            href={siteConfig.resume[locale]}
            download
            className={buttonClassName("ghost")}
          >
            <Download size={16} aria-hidden /> {t("resume.label")}
          </a>
          <span className="text-muted font-mono text-xs">{t("resume.meta")}</span>
        </div>
      </div>
    </section>
  );
}
