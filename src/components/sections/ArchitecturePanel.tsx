import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";

/**
 * Decorative, simulated data-flow diagram. Pure SVG + CSS (see `.arch-*` in
 * globals.css). Animations only run when the user has not asked for reduced
 * motion; the static diagram (nodes + directional arrows) stays readable.
 *
 * Packet speed is ~110 px/s in viewBox units. Each link's `delay` is the
 * moment its packet departs; `arrive` is when the target node pulses. The
 * whole loop lasts 7s (keep in sync with --arch-cycle in globals.css).
 */

type Tone = "primary" | "secondary" | "neutral";
type Delay = CSSProperties & { "--delay": string };

const nodes = [
  { id: "client", x: 12, y: 120, w: 96, h: 56, tone: "neutral", arrive: 4.75 },
  { id: "gateway", x: 164, y: 108, w: 112, h: 80, tone: "primary", arrive: 0.51 },
  { id: "realtime", x: 336, y: 16, w: 132, h: 48, tone: "secondary", arrive: 1.61 },
  { id: "services", x: 336, y: 124, w: 132, h: 48, tone: "neutral", arrive: 1.06 },
  { id: "database", x: 336, y: 232, w: 132, h: 48, tone: "neutral", arrive: 1.61 },
] as const satisfies readonly {
  id: string; x: number; y: number; w: number; h: number; tone: Tone; arrive: number;
}[];

const links = [
  { id: "request", d: "M108 148 H164", len: 56, tone: "primary", delay: 0 },
  { id: "route", d: "M276 148 H336", len: 60, tone: "primary", delay: 0.51 },
  { id: "persist", d: "M402 172 V232", len: 60, tone: "primary", delay: 1.06 },
  { id: "publish", d: "M402 124 V64", len: 60, tone: "secondary", delay: 1.06 },
  { id: "push", d: "M336 40 H84 Q60 40 60 64 V120", len: 345, tone: "secondary", delay: 1.61 },
] as const satisfies readonly { id: string; d: string; len: number; tone: Tone; delay: number }[];

const toneStyles: Record<
  Tone,
  { body: string; text: string; dot: string; glow: string; packet: string; tail: string }
> = {
  primary: {
    body: "stroke-primary/55 group-hover:stroke-primary",
    text: "fill-primary",
    dot: "fill-primary",
    glow: "stroke-primary fill-primary/10",
    packet: "stroke-primary [filter:drop-shadow(0_0_3px_var(--color-primary))]",
    tail: "stroke-primary",
  },
  secondary: {
    body: "stroke-secondary/55 group-hover:stroke-secondary",
    text: "fill-secondary",
    dot: "fill-secondary",
    glow: "stroke-secondary fill-secondary/10",
    packet: "stroke-secondary [filter:drop-shadow(0_0_3px_var(--color-secondary))]",
    tail: "stroke-secondary",
  },
  neutral: {
    body: "stroke-border group-hover:stroke-muted",
    text: "fill-foreground",
    dot: "fill-muted/60",
    glow: "stroke-primary fill-primary/5",
    packet: "",
    tail: "",
  },
};

export function ArchitecturePanel() {
  const t = useTranslations("architecture");

  return (
    <div
      className="@container border-border bg-surface relative overflow-hidden rounded-2xl border shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8)]"
      role="img"
      aria-label={t("ariaLabel")}
    >
      <div className="border-border flex items-center justify-between gap-3 border-b px-4 py-3" aria-hidden="true">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 @max-sm:hidden">
            <span className="bg-border size-2.5 rounded-full" />
            <span className="bg-border size-2.5 rounded-full" />
            <span className="bg-border size-2.5 rounded-full" />
          </span>
          <span className="text-muted font-mono text-xs whitespace-nowrap">system.architecture</span>
        </div>
        <span className="text-muted font-mono text-[11px] whitespace-nowrap">{t("simulated")}</span>
      </div>

      <div className="p-2 sm:p-5">
        <svg viewBox="0 0 480 296" className="block h-auto w-full" aria-hidden="true">
          <defs>
            <marker
              id="arch-arrow"
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="8"
              markerHeight="8"
              markerUnits="userSpaceOnUse"
              orient="auto"
            >
              <path d="M0 0.8 L7 4 L0 7.2z" className="fill-muted/60" />
            </marker>
          </defs>

          {/* links: static base line, then lit trail and packet on top */}
          {links.map((link) => {
            const tone = toneStyles[link.tone];
            const style: Delay = { "--delay": `${link.delay}s` };
            return (
              <g key={link.id} fill="none" strokeLinecap="round">
                <path
                  d={link.d}
                  className="stroke-muted/40"
                  strokeWidth="1.5"
                  strokeDasharray="3 5"
                  markerEnd="url(#arch-arrow)"
                />
                <path
                  d={link.d}
                  pathLength={link.len}
                  className={`arch-tail ${tone.tail}`}
                  strokeWidth="2"
                  strokeLinecap="butt"
                  style={style}
                />
                <path
                  d={link.d}
                  pathLength={link.len}
                  className={`arch-packet ${tone.packet}`}
                  strokeWidth="6"
                  style={style}
                />
              </g>
            );
          })}

          {/* nodes */}
          <g fontFamily="var(--font-jetbrains-mono), monospace">
            {nodes.map((node) => {
              const tone = toneStyles[node.tone];
              const cx = node.x + node.w / 2;
              const cy = node.y + node.h / 2;
              const label = t(`nodes.${node.id}.label`);
              const sub = t(`nodes.${node.id}.sub`);
              // Longer translated labels (e.g. "Banco de dados") get a smaller size so they fit the node.
              const long = label.length > 10;
              const glowStyle: Delay = { "--delay": `${node.arrive}s` };
              return (
                <g key={node.id} className="group">
                  <rect
                    x={node.x}
                    y={node.y}
                    width={node.w}
                    height={node.h}
                    rx="12"
                    strokeWidth="1.25"
                    className={`fill-surface-elevated transition-colors duration-200 ${tone.body}`}
                  />
                  <rect
                    x={node.x}
                    y={node.y}
                    width={node.w}
                    height={node.h}
                    rx="12"
                    strokeWidth="1.5"
                    className={`arch-glow ${tone.glow}`}
                    style={glowStyle}
                  />
                  <circle cx={node.x + node.w - 11} cy={node.y + 11} r="2.5" className={tone.dot} />
                  {/* with sub-label (panel wide enough) */}
                  <text x={cx} y={cy - 2} textAnchor="middle" fontSize={long ? 12.5 : 15} fontWeight="500" className={`@max-md:hidden ${tone.text}`}>
                    {label}
                  </text>
                  <text x={cx} y={cy + 15} textAnchor="middle" fontSize="11" className="fill-muted @max-md:hidden">
                    {sub}
                  </text>
                  {/* label only (narrow panel) */}
                  <text x={cx} y={cy + 6} textAnchor="middle" fontSize={long ? 14 : 17} fontWeight="500" className={`@md:hidden ${tone.text}`}>
                    {label}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        <ul className="text-muted mt-4 flex gap-5 font-mono text-[11px]" aria-hidden="true">
          <li className="flex items-center gap-2">
            <span className="bg-primary size-1.5 rounded-full" /> {t("legendRequest")}
          </li>
          <li className="flex items-center gap-2">
            <span className="bg-secondary size-1.5 rounded-full" /> {t("legendEvent")}
          </li>
        </ul>
      </div>
    </div>
  );
}
