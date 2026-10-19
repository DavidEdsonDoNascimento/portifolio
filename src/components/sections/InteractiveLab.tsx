import { SectionHeading } from "@/components/ui/SectionHeading";

export function InteractiveLab() {
  return (
    <section
      id="lab"
      aria-labelledby="lab-title"
      className="border-border border-t px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="lab-title"
          eyebrow="03 / Lab"
          title="Interactive Lab"
        />
        <div className="border-border bg-surface relative overflow-hidden rounded-2xl border p-8 sm:p-12">
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />
          <div className="relative max-w-xl">
            <p className="border-secondary/40 text-secondary inline-block rounded-full border px-3 py-1 font-mono text-xs">
              Coming soon
            </p>
            <h3 className="font-display mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">
              Packet Rush Mini
            </h3>
            <p className="text-muted mt-3 leading-relaxed">
              A tiny interactive challenge inspired by real-time systems. Coming soon.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
