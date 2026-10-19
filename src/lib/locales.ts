/** Pure locale constants, shared by the i18n routing and the SEO helpers. */
export const locales = ["en", "pt"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** Value for the <html lang> attribute and hreflang. */
export const htmlLang: Record<Locale, string> = { en: "en", pt: "pt-BR" };

/** Locale tag used by Intl formatters. */
export const intlLocale: Record<Locale, string> = { en: "en-US", pt: "pt-BR" };
