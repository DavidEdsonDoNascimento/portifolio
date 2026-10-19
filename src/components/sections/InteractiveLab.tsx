import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PacketRush } from "./PacketRush";

export function InteractiveLab() {
  const t = useTranslations("lab");

  return (
    <section
      id="lab"
      aria-labelledby="lab-title"
      className="border-border border-t px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="lab-title"
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
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
