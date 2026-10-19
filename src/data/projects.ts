import type { Project } from "@/types/content";

/** Stable anchor id of the Videosoft card (used by "#id" links, e.g. from the Lab). */
export const REALTIME_PROJECT_ID = "realtime-integration-engine";

export const projects: Project[] = [
  {
    id: REALTIME_PROJECT_ID,
    visual: "integration",
    featured: true,
    technologies: [
      "NestJS",
      "Node.js",
      "TypeScript",
      "WebSockets",
      "AWS Lambda",
      { key: "queuesMessaging" },
      "PostgreSQL",
      "MongoDB",
      "Angular / PWA",
      "Jest",
    ],
  },
  {
    id: "order-management-platform",
    visual: "orders",
    technologies: ["Next.js", "React", "TypeScript"],
    link: { href: "https://pedidos.anterosistemas.com.br/", kind: "private" },
  },
  {
    id: "antero-sistemas-website",
    visual: "website",
    technologies: ["Next.js", "TypeScript", "Resend", "Cloudflare"],
    link: { href: "https://www.anterosistemas.com.br/", kind: "public" },
  },
];
