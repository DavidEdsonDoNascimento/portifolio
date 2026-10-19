// Decorative architecture diagram. Static SVG, no external assets.
export function ArchitecturePanel() {
  return (
    <div
      className="border-border bg-surface relative overflow-hidden rounded-2xl border"
      role="img"
      aria-label="Simplified system architecture diagram: a client connects through an API gateway to services, a message queue and a database."
    >
      <div className="border-border flex items-center gap-2 border-b px-4 py-3">
        <span className="bg-border size-2.5 rounded-full" />
        <span className="bg-border size-2.5 rounded-full" />
        <span className="bg-border size-2.5 rounded-full" />
        <span className="text-muted ml-3 font-mono text-xs">system.architecture</span>
      </div>

      <svg viewBox="0 0 480 320" className="block w-full" aria-hidden="true">
        {/* connections */}
        <g className="stroke-border" strokeWidth="1.5" fill="none" strokeDasharray="4 4">
          <path d="M120 160 H190" />
          <path d="M290 160 C320 160 320 80 350 80" />
          <path d="M290 160 H350" />
          <path d="M290 160 C320 160 320 240 350 240" />
        </g>
        <g className="stroke-secondary" strokeWidth="1.5" fill="none">
          <path d="M120 160 H190" strokeDasharray="0" opacity="0.5" />
        </g>

        {/* nodes */}
        <g fontFamily="var(--font-jetbrains-mono), monospace" fontSize="12">
          <g>
            <rect x="24" y="132" width="96" height="56" rx="10" className="fill-surface-elevated stroke-border" />
            <text x="72" y="165" textAnchor="middle" className="fill-foreground">Client</text>
          </g>
          <g>
            <rect x="190" y="124" width="100" height="72" rx="10" className="fill-surface-elevated stroke-primary" />
            <text x="240" y="156" textAnchor="middle" className="fill-primary">API</text>
            <text x="240" y="174" textAnchor="middle" className="fill-muted">gateway</text>
          </g>
          <g>
            <rect x="350" y="56" width="106" height="48" rx="10" className="fill-surface-elevated stroke-border" />
            <text x="403" y="85" textAnchor="middle" className="fill-foreground">Services</text>
          </g>
          <g>
            <rect x="350" y="136" width="106" height="48" rx="10" className="fill-surface-elevated stroke-secondary" />
            <text x="403" y="165" textAnchor="middle" className="fill-secondary">WebSocket</text>
          </g>
          <g>
            <rect x="350" y="216" width="106" height="48" rx="10" className="fill-surface-elevated stroke-border" />
            <text x="403" y="245" textAnchor="middle" className="fill-foreground">Database</text>
          </g>
        </g>
      </svg>
    </div>
  );
}
