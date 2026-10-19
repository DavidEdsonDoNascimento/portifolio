import type { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="border-border text-muted inline-flex items-center rounded-full border px-3 py-1 font-mono text-xs">
      {children}
    </span>
  );
}
