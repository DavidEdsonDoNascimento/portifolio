"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <div className="border-border bg-surface/90 relative mx-auto flex max-w-6xl items-center justify-between rounded-full border py-2 pr-2 pl-5 backdrop-blur">
        <a
          href="#top"
          className="font-mono text-sm font-medium tracking-wider"
          onClick={() => setOpen(false)}
        >
          {siteConfig.name}
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-muted hover:text-foreground rounded-full px-4 py-2 text-sm transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#contact"
          className="bg-primary text-background hover:bg-primary/85 hidden rounded-full px-5 py-2 text-sm font-medium transition-colors md:inline-block"
        >
          Get in Touch
        </a>

        <button
          type="button"
          className="text-foreground hover:bg-surface-elevated inline-flex size-10 items-center justify-center rounded-full md:hidden"
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
            className="border-border bg-surface absolute inset-x-0 top-full mt-2 rounded-2xl border p-3 md:hidden"
          >
            <ul className="flex flex-col">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-foreground hover:bg-surface-elevated block rounded-xl px-4 py-3 text-base"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
