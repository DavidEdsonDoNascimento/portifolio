import type { Project } from "@/types/content";

export const projects: Project[] = [
  {
    id: "realtime-integration-engine",
    category: "Enterprise Systems / Real-Time Integrations",
    title: "Real-Time Integration Engine",
    context: "Videosoft Soluções em Autoatendimento",
    description:
      "Engineered configurable integrations and real-time product synchronization for enterprise self-service platforms, replacing periodic updates with event-driven communication.",
    highlights: [
      "Configurable integrations managed from the admin panel, with no need to republish the PWA.",
      "Real-time product synchronization using AWS components and queues.",
      "Event-driven communication over WebSockets.",
      "Contributed to integrations with iFood, NCR Aloha/Colibri, TOTVS and GCOM.",
    ],
    technologies: [
      "NestJS",
      "Node.js",
      "TypeScript",
      "WebSockets",
      "AWS Lambda",
      "Queues & messaging",
      "PostgreSQL",
      "MongoDB",
      "Angular / PWA",
      "Jest",
    ],
    visual: "integration",
    visualCaption: "Conceptual illustration",
    featured: true,
  },
  {
    id: "order-management-platform",
    category: "Business Automation / Full Stack",
    title: "Order Management Platform",
    context: "Antero Pedidos · Independent project",
    description:
      "Designed and developed a custom order management platform to streamline business workflows and reduce reliance on manual processes.",
    highlights: [
      "Built for the operational workflows of a commercial operation.",
      "Designed with the goal of reducing manual controls in day-to-day work.",
    ],
    technologies: ["Next.js", "React", "TypeScript"],
    visual: "orders",
    visualCaption: "Conceptual illustration · no real data",
    link: {
      label: "Private Application — Login Required",
      href: "https://pedidos.anterosistemas.com.br/",
      kind: "private",
    },
  },
  {
    id: "antero-sistemas-website",
    category: "Web Development / Business Website",
    title: "Antero Sistemas",
    context: "Corporate website · Own software brand",
    description:
      "Designed and developed the corporate website for Antero Sistemas using Next.js and TypeScript, with responsive interfaces, clear service presentation, and email delivery integrated through Resend and Cloudflare.",
    highlights: [
      "Responsive interface.",
      "Clear presentation of services.",
      "Email delivery integrated through Resend and Cloudflare.",
      "Built around discovery and contact.",
    ],
    technologies: ["Next.js", "TypeScript", "Resend", "Cloudflare"],
    visual: "website",
    visualCaption: "Illustrative layout",
    link: {
      label: "Visit Website",
      href: "https://www.anterosistemas.com.br/",
      kind: "public",
    },
  },
];
