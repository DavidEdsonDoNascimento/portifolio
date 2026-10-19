/**
 * Single source of truth for the public site URL.
 *
 * `NEXT_PUBLIC_SITE_URL` is read at BUILD time (Next.js inlines it), so it must
 * be available while `next build` runs, e.g. as a Docker build argument.
 * Until a valid value is configured the site stays safe for development: no
 * canonical/hreflang, no sitemap and `noindex`.
 */

export type SiteUrl =
  | { configured: true; origin: string }
  | { configured: false; reason: string };

const IPV4 = /^\d{1,3}(\.\d{1,3}){3}$/;

/**
 * Accepts only an absolute HTTPS origin of a public domain: no credentials,
 * query string, fragment, path or custom port. Returns it normalized
 * (lower-case, no trailing slash).
 */
export function parseSiteUrl(raw: string | undefined): SiteUrl {
  const value = raw?.trim();
  if (!value) return { configured: false, reason: "NEXT_PUBLIC_SITE_URL is not set" };

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return { configured: false, reason: "not an absolute URL" };
  }

  if (url.protocol !== "https:") return { configured: false, reason: "must use https" };
  if (url.username || url.password) return { configured: false, reason: "must not contain credentials" };
  if (value.includes("?") || value.includes("#")) {
    return { configured: false, reason: "must not contain a query string or fragment" };
  }
  if (url.pathname !== "/") return { configured: false, reason: "must be an origin without a path" };
  if (url.port) return { configured: false, reason: "must not set a custom port" };

  const host = url.hostname;
  const local =
    host === "localhost" ||
    host.endsWith(".localhost") ||
    host.endsWith(".local") ||
    host.endsWith(".internal") ||
    host.startsWith("[") ||
    IPV4.test(host) ||
    !host.includes(".");
  if (local) return { configured: false, reason: "must be a public domain, not a local or IP address" };

  return { configured: true, origin: url.origin };
}

const parsed = parseSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

if (!parsed.configured && process.env.NEXT_PUBLIC_SITE_URL?.trim()) {
  // A value was provided but rejected: say why instead of failing silently.
  console.warn(`[site-url] Ignoring NEXT_PUBLIC_SITE_URL: ${parsed.reason}.`);
}

export const siteUrl: SiteUrl = parsed;
