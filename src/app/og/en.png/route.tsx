import { ogResponse, renderOgPng } from "@/lib/og-image";

// Prerendered at build time. The `.png` folder name keeps the URL extension-based,
// so the next-intl proxy ignores it.
export async function GET() {
  return ogResponse(await renderOgPng("en"));
}
