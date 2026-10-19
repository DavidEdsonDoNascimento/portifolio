"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";

const sectionIds = siteConfig.nav.map((item) => item.href.slice(1));

export function Header() {
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

  const linkClass = (id: string) =>
    `rounded-full px-4 py-2 text-sm transition-colors duration-200 hover:bg-surface-elevated hover:text-foreground ${
      active === id ? "text-foreground" : "text-muted"
    }`;

  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <div className="border-border bg-surface/80 relative mx-auto flex max-w-6xl items-center justify-between rounded-full border py-2 pr-2 pl-4 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md">
        <a
          href="#top"
          className="group flex items-center gap-2.5 rounded-full py-1 pr-2"
          onClick={() => setOpen(false)}
          aria-label={`${siteConfig.name} — back to top`}
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

        <nav aria-label="Primary" className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
          <ul className="flex items-center gap-0.5">
            {siteConfig.nav.map((item) => {
              const id = item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={linkClass(id)}
                    aria-current={active === id ? "location" : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <a
          href="#contact"
          className="bg-primary text-background hover:bg-primary/90 hidden rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 hover:shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-primary)_18%,transparent)] lg:inline-block"
        >
          Get in Touch
        </a>

        <button
          ref={toggleRef}
          type="button"
          className="text-foreground hover:bg-surface-elevated inline-flex size-10 items-center justify-center rounded-full transition-colors duration-200 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
        </button>

        {open ? (
          <nav
            id="mobile-menu"
            aria-label="Mobile"
            className="border-border bg-surface absolute inset-x-0 top-full mt-2 rounded-3xl border p-3 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.7)] lg:hidden"
          >
            <ul className="flex flex-col gap-0.5">
              {siteConfig.nav.map((item) => {
                const id = item.href.slice(1);
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={`hover:bg-surface-elevated block rounded-2xl px-4 py-3 text-base transition-colors duration-200 ${
                        active === id ? "text-primary" : "text-foreground"
                      }`}
                      aria-current={active === id ? "location" : undefined}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
              <li className="mt-2">
                <a
                  href="#contact"
                  className="bg-primary text-background hover:bg-primary/90 block rounded-full px-4 py-3 text-center text-base font-medium transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Get in Touch
                </a>
              </li>
            </ul>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
