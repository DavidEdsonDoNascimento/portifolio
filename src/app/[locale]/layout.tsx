import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { htmlLang, routing } from "@/i18n/routing";
import { OG_SIZE } from "@/lib/og-image";
import { localePath, pageAlternates, robotsMeta } from "@/lib/seo";
import { siteUrl } from "@/lib/site-url";
import "../globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const ogLocale = { en: "en_US", pt: "pt_BR" } as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: "metadata" });
  const title = t("title", { name: siteConfig.name });
  const description = t("description");
  const ogAlt = `${siteConfig.name} — ${(await getTranslations({ locale, namespace: "hero" }))("role")}`;

  const base: Metadata = {
    title,
    description,
    // Stay out of search indexes until a valid public URL is configured.
    robots: robotsMeta(siteUrl.configured),
  };

  // Without a valid NEXT_PUBLIC_SITE_URL nothing absolute is emitted: no
  // canonical, hreflang or social image (no localhost, no invented domain).
  if (!siteUrl.configured) {
    return {
      ...base,
      openGraph: { type: "website", title, description, siteName: siteConfig.name, locale: ogLocale[locale] },
    };
  }

  const image = { url: `/og/${locale}.png`, width: OG_SIZE.width, height: OG_SIZE.height, alt: ogAlt };
  return {
    ...base,
    metadataBase: new URL(siteUrl.origin),
    alternates: pageAlternates(siteUrl.origin, locale),
    openGraph: {
      type: "website",
      title,
      description,
      siteName: siteConfig.name,
      url: localePath(locale),
      locale: ogLocale[locale],
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export const viewport: Viewport = {
  themeColor: "#0a0d10",
  colorScheme: "dark",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: "common" });
  const messages = await getMessages();

  return (
    <html
      lang={htmlLang[locale]}
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-dvh font-sans">
        <a
          href="#main"
          className="bg-primary text-background sr-only z-[60] rounded-md px-4 py-2 font-medium focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          {t("skipToContent")}
        </a>
        {/* Only the client components need messages: Header and Packet Rush. */}
        <NextIntlClientProvider
          locale={locale}
          messages={{ navigation: messages.navigation, packetRush: messages.packetRush }}
        >
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
