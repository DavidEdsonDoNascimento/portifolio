import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "pt"],
  defaultLocale: "en",
  // `/` is English, `/pt` is Brazilian Portuguese.
  localePrefix: "as-needed",
  // The URL is the single source of truth: no Accept-Language detection and
  // no NEXT_LOCALE cookie. Visiting `/` always shows English.
  localeDetection: false,
  localeCookie: false,
  // hreflang lives in page metadata (see layout), so no Link header with the
  // internal host.
  alternateLinks: false,
});

export type Locale = (typeof routing.locales)[number];

/** Value for the <html lang> attribute. */
export const htmlLang: Record<Locale, string> = { en: "en", pt: "pt-BR" };

/** Locale tag used by Intl formatters. */
export const intlLocale: Record<Locale, string> = { en: "en-US", pt: "pt-BR" };
