import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { htmlLang, routing } from "@/i18n/routing";
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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const title = t("title", { name: siteConfig.name });

  // Optional: set NEXT_PUBLIC_SITE_URL (e.g. at build time) once the domain is
  // defined to emit canonical + hreflang. Nothing is assumed until then.
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const alternates = siteUrl
    ? {
        metadataBase: new URL(siteUrl),
        alternates: {
          canonical: locale === routing.defaultLocale ? "/" : `/${locale}`,
          languages: { en: "/", "pt-BR": "/pt", "x-default": "/" },
        },
      }
    : {};

  return {
    title,
    description: t("description"),
    openGraph: {
      type: "website",
      title,
      description: t("description"),
      siteName: siteConfig.name,
      locale: locale === "pt" ? "pt_BR" : "en_US",
    },
    ...alternates,
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
