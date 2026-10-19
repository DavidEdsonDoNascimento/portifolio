import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import type { ProjectVisualKind } from "@/types/content";

/**
 * Conceptual SVG illustrations for the project cards. None of them uses real
 * data, logos or screenshots. Only the integration diagram moves, reusing the
 * `.arch-*` packet animation from globals.css (disabled with reduced motion).
 */

type Delay = CSSProperties & { "--delay": string };

const svgProps = {
  viewBox: "0 0 480 300",
  className: "block h-full w-full",
  "aria-hidden": true,
} as const;

/* ---------- Integration engine ---------- */

const flowNodes = [
  { id: "partners", x: 16, y: 40, w: 112, h: 52, tone: "neutral", dashed: true, arrive: [] },
  { id: "queue", x: 184, y: 24, w: 112, h: 48, tone: "neutral", dashed: false, arrive: [0.67] },
  { id: "engine", x: 184, y: 112, w: 112, h: 76, tone: "primary", dashed: false, arrive: [1.03, 4.29] },
  { id: "admin", x: 16, y: 208, w: 112, h: 52, tone: "neutral", dashed: false, arrive: [] },
  { id: "pwa", x: 352, y: 112, w: 112, h: 76, tone: "secondary", dashed: false, arrive: [1.54] },
] as const;

const flowLinks = [
  { id: "event-in", d: "M128 66 H156 V48 H184", len: 74, tone: "primary", delay: 0 },
  { id: "dispatch", d: "M240 72 V112", len: 40, tone: "primary", delay: 0.67 },
  { id: "push", d: "M296 150 H352", len: 56, tone: "secondary", delay: 1.03 },
  { id: "config", d: "M128 234 H156 V170 H184", len: 120, tone: "primary", delay: 3.2 },
] as const;

const flowTone = {
  primary: {
    body: "stroke-primary/60",
    text: "fill-primary",
    glow: "stroke-primary fill-primary/10",
    packet: "stroke-primary [filter:drop-shadow(0_0_3px_var(--color-primary))]",
    tail: "stroke-primary",
  },
  secondary: {
    body: "stroke-secondary/60",
    text: "fill-secondary",
    glow: "stroke-secondary fill-secondary/10",
    packet: "stroke-secondary [filter:drop-shadow(0_0_3px_var(--color-secondary))]",
    tail: "stroke-secondary",
  },
  neutral: {
    body: "stroke-border",
    text: "fill-foreground",
    glow: "stroke-primary fill-primary/5",
    packet: "",
    tail: "",
  },
} as const;

function IntegrationVisual() {
  const t = useTranslations("projects.visual");

  return (
    <svg {...svgProps}>
      <defs>
        <marker id="pv-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="8" markerHeight="8" markerUnits="userSpaceOnUse" orient="auto">
          <path d="M0 0.8 L7 4 L0 7.2z" className="fill-muted/60" />
        </marker>
      </defs>

      {flowLinks.map((link) => {
        const tone = flowTone[link.tone];
        const style: Delay = { "--delay": `${link.delay}s` };
        return (
          <g key={link.id} fill="none" strokeLinecap="round">
            <path d={link.d} className="stroke-muted/40" strokeWidth="1.5" strokeDasharray="3 5" markerEnd="url(#pv-arrow)" />
            <path d={link.d} pathLength={link.len} className={`arch-tail ${tone.tail}`} strokeWidth="2" strokeLinecap="butt" style={style} />
            <path d={link.d} pathLength={link.len} className={`arch-packet ${tone.packet}`} strokeWidth="6" style={style} />
          </g>
        );
      })}

      <g fontFamily="var(--font-jetbrains-mono), monospace">
        {flowNodes.map((node) => {
          const tone = flowTone[node.tone];
          const label = t(`${node.id}.label`);
          const sub = t(`${node.id}.sub`);
          const long = label.length > 9;
          const cx = node.x + node.w / 2;
          const cy = node.y + node.h / 2;
          return (
            <g key={node.id}>
              <rect
                x={node.x}
                y={node.y}
                width={node.w}
                height={node.h}
                rx="12"
                strokeWidth="1.25"
                strokeDasharray={node.dashed ? "4 4" : undefined}
                className={`fill-surface-elevated ${tone.body}`}
              />
              {node.arrive.map((at) => (
                <rect
                  key={at}
                  x={node.x}
                  y={node.y}
                  width={node.w}
                  height={node.h}
                  rx="12"
                  strokeWidth="1.5"
                  className={`arch-glow ${tone.glow}`}
                  style={{ "--delay": `${at}s` } as Delay}
                />
              ))}
              <text x={cx} y={cy - 1} textAnchor="middle" fontSize={long ? 13 : 15} fontWeight="500" className={`@max-sm:hidden ${tone.text}`}>
                {label}
              </text>
              <text x={cx} y={cy + 16} textAnchor="middle" fontSize="11" className="fill-muted @max-sm:hidden">
                {sub}
              </text>
              <text x={cx} y={cy + 6} textAnchor="middle" fontSize={long ? 14.5 : 17} fontWeight="500" className={`@sm:hidden ${tone.text}`}>
                {label}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/* ---------- Order management (abstract dashboard) ---------- */

const columns = [
  { x: 84, dot: "fill-primary", pill: "fill-primary/70", cards: 3 },
  { x: 208, dot: "fill-secondary", pill: "fill-secondary/70", cards: 3 },
  { x: 332, dot: "fill-muted", pill: "fill-muted/50", cards: 2 },
] as const;

function OrdersVisual() {
  return (
    <svg {...svgProps}>
      <rect x="8" y="8" width="464" height="284" rx="14" className="fill-surface stroke-border" />

      {/* sidebar */}
      <rect x="16" y="16" width="52" height="268" rx="10" className="fill-surface-elevated" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x="30"
          y={34 + i * 36}
          width="24"
          height="24"
          rx="7"
          className={i === 1 ? "fill-primary/15 stroke-primary/60" : "fill-border"}
        />
      ))}

      {/* top bar */}
      <rect x="84" y="16" width="190" height="26" rx="13" className="fill-surface-elevated" />
      <rect x="380" y="21" width="40" height="16" rx="8" className="fill-border" />
      <circle cx="450" cy="29" r="13" className="fill-border" />

      {/* summary cards */}
      {[84, 208, 332].map((x, i) => (
        <g key={x}>
          <rect x={x} y="54" width="116" height="58" rx="10" className="fill-surface-elevated stroke-border" />
          <rect x={x + 12} y="66" width="40" height="5" rx="2.5" className="fill-muted/40" />
          <rect x={x + 12} y="82" width="56" height="11" rx="3" className="fill-foreground/70" />
          <path
            d={`M${x + 74} 98 l9 -7 l8 4 l9 -10`}
            fill="none"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={i === 0 ? "stroke-primary" : i === 1 ? "stroke-secondary" : "stroke-muted/60"}
          />
        </g>
      ))}

      {/* status columns */}
      {columns.map((col, ci) => (
        <g key={col.x}>
          <rect x={col.x} y="124" width="116" height="160" rx="10" className="fill-surface-elevated/40 stroke-border" />
          <circle cx={col.x + 14} cy="139" r="3.5" className={col.dot} />
          <rect x={col.x + 24} y="136.5" width="44" height="5" rx="2.5" className="fill-muted/50" />
          {Array.from({ length: col.cards }).map((_, i) => (
            <g key={i}>
              <rect
                x={col.x + 8}
                y={150 + i * 42}
                width="100"
                height="36"
                rx="8"
                className={`fill-surface ${ci === 1 && i === 0 ? "stroke-primary/70" : "stroke-border"}`}
              />
              <rect x={col.x + 18} y={160 + i * 42} width="52" height="4.5" rx="2.25" className="fill-muted/50" />
              <rect x={col.x + 18} y={171 + i * 42} width="34" height="4" rx="2" className="fill-border" />
              <rect x={col.x + 84} y={160 + i * 42} width="14" height="8" rx="4" className={col.pill} />
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}

/* ---------- Corporate website (abstract page layout) ---------- */

function WebsiteVisual() {
  return (
    <svg {...svgProps}>
      <rect x="8" y="8" width="464" height="284" rx="14" className="fill-surface stroke-border" />

      {/* browser chrome */}
      {[26, 40, 54].map((cx) => (
        <circle key={cx} cx={cx} cy="22" r="3.5" className="fill-border" />
      ))}
      <rect x="80" y="14" width="200" height="16" rx="8" className="fill-surface-elevated" />
      <line x1="8" y1="38" x2="472" y2="38" className="stroke-border" />

      {/* nav */}
      <rect x="28" y="50" width="16" height="16" rx="4" className="fill-primary" />
      <rect x="50" y="56" width="50" height="5" rx="2.5" className="fill-foreground/60" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={250 + i * 42} y="56" width="30" height="5" rx="2.5" className="fill-muted/40" />
      ))}
      <rect x="424" y="48" width="36" height="20" rx="10" className="fill-primary" />

      {/* hero copy */}
      <rect x="28" y="92" width="210" height="14" rx="4" className="fill-foreground/80" />
      <rect x="28" y="114" width="100" height="14" rx="4" className="fill-foreground/80" />
      <rect x="136" y="114" width="56" height="14" rx="4" className="fill-primary" />
      <rect x="28" y="142" width="230" height="5" rx="2.5" className="fill-muted/40" />
      <rect x="28" y="154" width="190" height="5" rx="2.5" className="fill-muted/40" />
      <rect x="28" y="172" width="78" height="22" rx="11" className="fill-primary" />
      <rect x="114" y="172" width="78" height="22" rx="11" className="fill-none stroke-border" />

      {/* hero visual */}
      <rect x="296" y="84" width="160" height="112" rx="12" className="fill-surface-elevated stroke-border" />
      <rect x="310" y="98" width="62" height="38" rx="8" className="fill-primary/15 stroke-primary/50" />
      <rect x="380" y="98" width="62" height="38" rx="8" className="fill-border" />
      <rect x="310" y="144" width="132" height="6" rx="3" className="fill-muted/30" />
      <rect x="310" y="158" width="90" height="6" rx="3" className="fill-muted/30" />
      <circle cx="426" cy="176" r="8" className="fill-secondary/40 stroke-secondary/60" />

      {/* services row */}
      {[28, 172, 316].map((x, i) => (
        <g key={x}>
          <rect x={x} y="214" width="136" height="60" rx="10" className="fill-surface-elevated stroke-border" />
          <rect
            x={x + 12}
            y="226"
            width="18"
            height="18"
            rx="5"
            className={i === 0 ? "fill-primary/20 stroke-primary/50" : i === 1 ? "fill-secondary/20 stroke-secondary/50" : "fill-border stroke-border"}
          />
          <rect x={x + 38} y="231" width="60" height="5" rx="2.5" className="fill-foreground/60" />
          <rect x={x + 12} y="252" width="104" height="4.5" rx="2.25" className="fill-muted/35" />
          <rect x={x + 12} y="262" width="76" height="4.5" rx="2.25" className="fill-muted/35" />
        </g>
      ))}
    </svg>
  );
}

const visuals: Record<ProjectVisualKind, () => React.JSX.Element> = {
  integration: IntegrationVisual,
  orders: OrdersVisual,
  website: WebsiteVisual,
};

export function ProjectVisual({ kind }: { kind: ProjectVisualKind }) {
  const Visual = visuals[kind];
  return <Visual />;
}
