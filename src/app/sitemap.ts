import type { MetadataRoute } from "next";
import { buildSitemap } from "@/lib/seo";
import { siteUrl } from "@/lib/site-url";

// Empty until a valid NEXT_PUBLIC_SITE_URL exists: no localhost, no made-up URLs.
export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemap(siteUrl.configured ? siteUrl.origin : null);
}
