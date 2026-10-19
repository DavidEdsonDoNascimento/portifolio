import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { siteConfig } from "@/config/site";
import { ArchitecturePanel } from "./ArchitecturePanel";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative flex items-center overflow-hidden px-6 pt-14 pb-20 sm:pt-20 sm:pb-24 lg:min-h-[calc(100svh-5.5rem)] lg:pt-16 lg:pb-28"
    >
      {/* backdrop: faint grid + one soft glow behind the panel */}
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute top-1/2 -right-24 hidden size-[34rem] -translate-y-1/2 rounded-full opacity-[0.12] blur-3xl lg:block"
        style={{ background: "radial-gradient(closest-side, var(--color-primary), transparent)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="border-border bg-surface/60 text-muted mb-7 inline-flex items-center gap-2.5 rounded-full border py-1.5 pr-4 pl-3 font-mono text-xs tracking-wide">
            <span className="bg-primary size-1.5 rounded-full" aria-hidden="true" />
            {t("role")}
          </p>

          <h1
            id="hero-title"
            className="font-display text-[clamp(2.5rem,9vw,3.9rem)] lg:text-[clamp(2.6rem,4.9vw,3.9rem)] leading-[1.05] font-semibold tracking-[-0.035em]"
          >
            <span className="block text-balance">{t("titleLine1")}</span>{" "}
            <span className="text-muted block text-balance">
              {t("titleLine2")} <span className="text-primary">{t("titleAccent")}</span>
            </span>
          </h1>

          <p className="text-muted mt-7 max-w-lg text-lg leading-relaxed text-pretty">
            {t("description")}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#work">
              {t("exploreWork")}
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              />
            </ButtonLink>
            <ButtonLink href="#contact" variant="ghost">
              {t("getInTouch")}
            </ButtonLink>
          </div>

          <div className="mt-12">
            <p className="text-muted mb-3 font-mono text-[11px] tracking-widest uppercase">
              {t("coreStack")}
            </p>
            <ul className="flex flex-wrap gap-2" aria-label={t("coreTechnologies")}>
              {siteConfig.stack.map((item) => (
                <li
                  key={item}
                  className="border-border bg-surface/50 text-foreground/85 hover:border-primary/40 hover:text-foreground rounded-md border px-3 py-1.5 font-mono text-[13px] transition-colors duration-200"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full max-w-xl lg:max-w-none">
          <ArchitecturePanel />
        </div>
      </div>

      {/* hairline hand-off into the next section */}
      <div
        className="via-primary/35 pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
