import type { ReactNode } from "react";

type Props = {
  href: string;
  variant?: "primary" | "ghost";
  children: ReactNode;
};

const base =
  "group inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-all duration-200 motion-safe:active:scale-[0.98] sm:w-auto";

const variants = {
  primary:
    "bg-primary text-background hover:bg-primary/90 hover:shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-primary)_18%,transparent),0_8px_24px_-8px_color-mix(in_srgb,var(--color-primary)_55%,transparent)]",
  ghost:
    "border border-border bg-surface/40 text-foreground hover:border-primary/60 hover:bg-surface hover:text-primary",
} as const;

export function buttonClassName(variant: keyof typeof variants = "primary") {
  return `${base} ${variants[variant]}`;
}

export function ButtonLink({ href, variant = "primary", children }: Props) {
  return (
    <a href={href} className={buttonClassName(variant)}>
      {children}
    </a>
  );
}
