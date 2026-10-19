import { SectionHeading } from "@/components/ui/SectionHeading";
import { PacketRush } from "./PacketRush";

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
          description="A tiny interactive challenge inspired by real-time systems."
        />
        <div className="border-border bg-surface relative overflow-hidden rounded-2xl border">
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />
          <div className="relative">
            <PacketRush />
          </div>
        </div>
      </div>
    </section>
  );
}
