import type { ReactNode } from "react";

type Props = {
  href: string;
  variant?: "primary" | "ghost";
  children: ReactNode;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200";

const variants = {
  primary: "bg-primary text-background hover:bg-primary/85",
  ghost:
    "border border-border text-foreground hover:border-primary/60 hover:text-primary",
} as const;

export function ButtonLink({ href, variant = "primary", children }: Props) {
  return (
    <a href={href} className={`${base} ${variants[variant]}`}>
      {children}
    </a>
  );
}
