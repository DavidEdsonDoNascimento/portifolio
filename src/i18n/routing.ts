import { defineRouting } from "next-intl/routing";
import { defaultLocale, locales } from "@/lib/locales";

export { htmlLang, intlLocale, type Locale } from "@/lib/locales";

export const routing = defineRouting({
  locales,
  defaultLocale,
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
