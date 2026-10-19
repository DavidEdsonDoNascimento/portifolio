import { readFile } from "node:fs/promises";
import path from "node:path";
import { cacheLife } from "next/cache";
import { ImageResponse } from "next/og";
import en from "../../messages/en.json";
import pt from "../../messages/pt.json";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/lib/locales";

export const OG_SIZE = { width: 1200, height: 630 } as const;

const copy = { en: en.metadata, pt: pt.metadata } as const;
const roles = { en: en.hero.role, pt: pt.hero.role } as const;

// Read from the project root: this only runs while `next build` prerenders the image.
const font = async (file: string) => {
  const buf = await readFile(path.join(process.cwd(), "src/assets/fonts", file));
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
};

const C = {
  bg: "#0a0d10",
  surface: "#141a1e",
  elevated: "#1c2529",
  border: "#293336",
  lime: "#b8f45a",
  mint: "#70dcc4",
  text: "#f3f6f1",
  muted: "#a8b3ab",
};

/** Abstract architecture sketch (shapes only, no text): client → gateway → services, with an event returning to the client. */
function Diagram() {
  const node = (x: number, y: number, w: number, h: number, stroke: string, fill = C.elevated) => (
    <rect x={x} y={y} width={w} height={h} rx={14} fill={fill} stroke={stroke} strokeWidth={2} />
  );
  return (
    <svg width="420" height="420" viewBox="0 0 420 420" fill="none">
      {/* links */}
      <g stroke={C.border} strokeWidth={2} strokeDasharray="6 8">
        <path d="M100 202 H170" />
        <path d="M270 202 H320" />
        <path d="M362 182 V86" />
        <path d="M362 238 V334" />
        <path d="M320 58 H64 Q60 58 60 62 V170" />
      </g>
      {/* nodes */}
      {node(20, 170, 80, 64, C.border)}
      {node(170, 150, 100, 104, C.lime, "#1b2a1f")}
      {node(320, 30, 84, 56, C.mint, "#16292a")}
      {node(320, 182, 84, 56, C.border)}
      {node(320, 334, 84, 56, C.border)}
      {/* node status dots */}
      <circle cx="388" cy="42" r="4" fill={C.mint} />
      <circle cx="255" cy="164" r="4" fill={C.lime} />
      {/* packets */}
      <circle cx="136" cy="202" r="6" fill={C.lime} />
      <circle cx="296" cy="202" r="6" fill={C.lime} />
      <circle cx="362" cy="286" r="6" fill={C.lime} />
      <circle cx="190" cy="58" r="6" fill={C.mint} />
    </svg>
  );
}

export async function renderOgImage(locale: Locale) {
  const [bold, regular, mono] = await Promise.all([
    font("space-grotesk-latin-700-normal.woff"),
    font("space-grotesk-latin-400-normal.woff"),
    font("jetbrains-mono-latin-400-normal.woff"),
  ]);
  const role = roles[locale];
  const tagline = copy[locale].ogTagline;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: C.bg,
          backgroundImage: `radial-gradient(circle at 82% 48%, rgba(184,244,90,0.13), rgba(10,13,16,0) 52%)`,
          fontFamily: "Space Grotesk",
          color: C.text,
        }}
      >
        {/* faint engineering grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage: `linear-gradient(to right, rgba(41,51,54,0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(41,51,54,0.45) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            opacity: 0.55,
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 0 64px 72px", width: 720 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                width: 64,
                height: 64,
                borderRadius: 32,
                border: `2px solid ${C.border}`,
                background: C.bg,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke={C.lime} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 9l-4 7 4 7M23 9l4 7-4 7M18 8l-4 16" />
              </svg>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "column", fontSize: 108, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3 }}>
              <span>David</span>
              <span>Nascimento</span>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 30,
                fontFamily: "JetBrains Mono",
                fontSize: role.length > 36 ? 26 : 30,
                color: C.lime,
              }}
            >
              {role}
            </div>
            <div style={{ display: "flex", flexDirection: "column", marginTop: 18, fontSize: 28, fontWeight: 400, color: C.muted }}>
              {tagline.split(/(?<=\.)\s+/).map((sentence) => (
                <span key={sentence}>{sentence}</span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center", paddingRight: 36 }}>
          <Diagram />
        </div>

        {/* bottom accent */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 6,
            display: "flex",
            backgroundImage: `linear-gradient(to right, ${C.lime}, rgba(184,244,90,0))`,
          }}
        />
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Space Grotesk", data: bold, weight: 700, style: "normal" },
        { name: "Space Grotesk", data: regular, weight: 400, style: "normal" },
        { name: "JetBrains Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}

export const ogAlt = (locale: Locale) => `${siteConfig.name} — ${roles[locale]}`;

/**
 * PNG bytes for a locale. `"use cache"` lets the route handlers below be
 * prerendered at build time, so nothing is rendered per request and the font
 * files are only read during the build.
 */
export async function renderOgPng(locale: Locale): Promise<ArrayBuffer> {
  "use cache";
  // The image only changes with a new build. Never revalidate at runtime: the
  // font sources live in src/, which the standalone image does not contain.
  cacheLife({ stale: 31_536_000, revalidate: 31_536_000, expire: 63_072_000 });
  return (await renderOgImage(locale)).arrayBuffer();
}

export function ogResponse(png: ArrayBuffer) {
  return new Response(png, {
    headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=86400" },
  });
}
