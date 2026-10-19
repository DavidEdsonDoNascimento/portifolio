import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${siteConfig.name} | ${siteConfig.title}`,
  description: siteConfig.description,
  openGraph: {
    type: "website",
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0d10",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={siteConfig.locale}
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-dvh font-sans">
        <a
          href="#main"
          className="bg-primary text-background sr-only z-[60] rounded-md px-4 py-2 font-medium focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
