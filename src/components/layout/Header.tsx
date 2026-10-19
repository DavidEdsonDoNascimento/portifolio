"use client";

import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { siteConfig } from "@/config/site";
import { getPathname } from "@/i18n/navigation";
import { htmlLang, routing, type Locale } from "@/i18n/routing";

const sectionIds = siteConfig.nav.map((item) => item.id);

export function Header() {
  const t = useTranslations("navigation");
  const locale = useLocale() as Locale;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the mobile menu with Escape and return focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Highlight the nav item of the section currently crossing the reading band.
  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const update = () => {
      const band = window.innerHeight * 0.4;
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current: string | null = null;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= band) current = section.id;
      }
      if (atBottom && sections.length) current = sections[sections.length - 1].id;
      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Switch language keeping the visitor's place: reuse the URL hash, or fall
  // back to the section currently being read. Changing the [locale] root layout
  // is a full page load anyway, so we navigate to `<localized path><hash>` and
  // let the browser scroll to the section. Without JS the plain links still
  // work (they point at `/` and `/pt`).
  const switchLocale = (event: MouseEvent, target: Locale) => {
    event.preventDefault();
    if (target === locale) return;
    const hash = window.location.hash || (active ? `#${active}` : "");
    setOpen(false);
    window.location.assign(getPathname({ href: "/", locale: target }) + hash);
  };

  const switcher = (
    <div
      role="group"
      aria-label={t("language.label")}
      className="border-border bg-background/60 flex items-center rounded-full border p-0.5 font-mono text-[11px]"
    >
      {routing.locales.map((code) => {
        const current = code === locale;
        return (
          <a
            key={code}
            href={getPathname({ href: "/", locale: code })}
            lang={htmlLang[code]}
            hrefLang={htmlLang[code]}
            aria-current={current ? "true" : undefined}
            onClick={(event) => switchLocale(event, code)}
            className={`rounded-full px-3 py-2 tracking-wider transition-colors duration-200 ${
              current
                ? "bg-primary/15 text-primary"
                : "text-muted hover:text-foreground hover:bg-surface-elevated"
            }`}
          >
            <span aria-hidden="true">{code.toUpperCase()}</span>
            <span className="sr-only">{t(`language.${code}`)}</span>
          </a>
        );
      })}
    </div>
  );

  const linkClass = (id: string) =>
    `rounded-full px-3 xl:px-4 py-2 text-sm transition-colors duration-200 hover:bg-surface-elevated hover:text-foreground ${
      active === id ? "text-foreground" : "text-muted"
    }`;

  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <div className="border-border bg-surface/80 relative mx-auto flex max-w-6xl items-center justify-between rounded-full border py-2 pr-2 pl-4 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md">
        <a
          href="#top"
          className="group flex items-center gap-2.5 rounded-full py-1 pr-2"
          onClick={() => setOpen(false)}
          aria-label={t("backToTop", { name: siteConfig.name })}
        >
          <span
            className="bg-background border-border text-primary group-hover:border-primary/60 inline-flex size-8 items-center justify-center rounded-full border transition-colors duration-200"
            aria-hidden="true"
          >
            <svg viewBox="0 0 32 32" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 9l-4 7 4 7M23 9l4 7-4 7M18 8l-4 16" />
            </svg>
          </span>
          <span className="font-display text-[0.95rem] font-semibold tracking-tight">
            {siteConfig.name}
          </span>
        </a>

        <nav aria-label={t("primary")} className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
          <ul className="flex items-center gap-0.5">
            {siteConfig.nav.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={linkClass(item.id)}
                  aria-current={active === item.id ? "location" : undefined}
                >
                  {t(item.id)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {switcher}
          <a
            href="#contact"
            className="bg-primary text-background hover:bg-primary/90 rounded-full px-5 py-2.5 text-sm font-medium whitespace-nowrap transition-all duration-200 hover:shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-primary)_18%,transparent)]"
          >
            {t("getInTouch")}
          </a>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="text-foreground hover:bg-surface-elevated inline-flex size-10 items-center justify-center rounded-full transition-colors duration-200 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t("closeMenu") : t("openMenu")}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
        </button>

        {open ? (
          <nav
            id="mobile-menu"
            aria-label={t("mobile")}
            className="border-border bg-surface absolute inset-x-0 top-full mt-2 rounded-3xl border p-3 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.7)] lg:hidden"
          >
            <ul className="flex flex-col gap-0.5">
              {siteConfig.nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className={`hover:bg-surface-elevated block rounded-2xl px-4 py-3 text-base transition-colors duration-200 ${
                      active === item.id ? "text-primary" : "text-foreground"
                    }`}
                    aria-current={active === item.id ? "location" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {t(item.id)}
                  </a>
                </li>
              ))}
              <li className="mt-2 flex items-center justify-between gap-3 px-1">
                <span className="text-muted font-mono text-[11px] tracking-widest uppercase">
                  {t("language.label")}
                </span>
                {switcher}
              </li>
              <li className="mt-2">
                <a
                  href="#contact"
                  className="bg-primary text-background hover:bg-primary/90 block rounded-full px-4 py-3 text-center text-base font-medium transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {t("getInTouch")}
                </a>
              </li>
            </ul>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
