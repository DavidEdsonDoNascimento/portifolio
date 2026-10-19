import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="border-border min-h-[calc(100svh-12rem)] border-t px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="contact-title"
          eyebrow="05 / Contact"
          title="Let's build something."
          description="Links will be added soon."
        />
        <ul className="grid gap-4 sm:grid-cols-3">
          {siteConfig.contact.map((item) => (
            <li key={item.id}>
              {item.href ? (
                <a
                  href={item.href}
                  className="border-border bg-surface hover:border-primary/50 flex items-center justify-between rounded-2xl border p-6 transition-all duration-200 motion-safe:hover:-translate-y-0.5"
                >
                  <span className="font-display text-lg font-semibold">{item.label}</span>
                  <ArrowUpRight size={18} className="text-primary" aria-hidden />
                </a>
              ) : (
                <div className="border-border bg-surface flex items-center justify-between rounded-2xl border border-dashed p-6">
                  <span className="font-display text-lg font-semibold">{item.label}</span>
                  <span className="text-muted font-mono text-xs">Coming soon</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
