import type { MetadataRoute } from "next";
import { defaultLocale, htmlLang, locales, type Locale } from "./locales.ts";

/** Public path of a locale: `/` for English, `/pt` for Portuguese. */
export function localePath(locale: Locale): string {
  return locale === defaultLocale ? "/" : `/${locale}`;
}

export function absoluteUrl(origin: string, path: string): string {
  return new URL(path, origin).toString();
}

/** hreflang map, with `x-default` pointing at the default language. */
export function languageUrls(origin: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) languages[htmlLang[locale]] = absoluteUrl(origin, localePath(locale));
  languages["x-default"] = absoluteUrl(origin, localePath(defaultLocale));
  return languages;
}

export function pageAlternates(origin: string, locale: Locale) {
  return {
    canonical: absoluteUrl(origin, localePath(locale)),
    languages: languageUrls(origin),
  };
}

/** Pages stay out of search indexes until a valid public URL is configured. */
export function robotsMeta(configured: boolean) {
  return configured ? { index: true, follow: true } : { index: false, follow: false };
}

export function buildSitemap(origin: string | null): MetadataRoute.Sitemap {
  if (!origin) return [];
  const languages = languageUrls(origin);
  return locales.map((locale) => ({
    url: absoluteUrl(origin, localePath(locale)),
    alternates: { languages },
  }));
}

export function buildRobots(origin: string | null): MetadataRoute.Robots {
  if (!origin) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: absoluteUrl(origin, "/sitemap.xml"),
  };
}
