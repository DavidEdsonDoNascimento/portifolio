import type { MetadataRoute } from "next";
import { buildRobots } from "@/lib/seo";
import { siteUrl } from "@/lib/site-url";

// Blocks everything until a valid NEXT_PUBLIC_SITE_URL is configured.
export default function robots(): MetadataRoute.Robots {
  return buildRobots(siteUrl.configured ? siteUrl.origin : null);
}
