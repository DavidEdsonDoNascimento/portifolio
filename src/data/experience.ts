import type { ExperienceEntry } from "@/types/content";

// Reverse chronological order. Roles and highlights live in the messages.
export const experience: ExperienceEntry[] = [
  {
    id: "altaa",
    company: "Altaa Digital",
    period: { start: "2026-08", end: "2026-10" },
    stack: [
      "Node.js",
      "TypeScript",
      "Fastify",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "BullMQ",
      "Docker",
      "Stripe",
      "Meta APIs",
      "LLMs",
    ],
  },
  {
    id: "antero",
    company: "Antero Sistemas",
    period: { start: "2026-06", end: "2026-08" },
    stack: ["Next.js", "React", "TypeScript"],
  },
  {
    id: "imagem",
    company: "Imagem Geosistemas",
    period: { start: "2024-04", end: "2026-05" },
    stack: ["React", "TypeScript", "JavaScript", "Go", "RabbitMQ", "Docker", "GIS", "REST APIs", "SQL"],
  },
  {
    id: "videosoft",
    company: "Videosoft",
    period: { start: "2020-04", end: "2024-03" },
    stack: [
      "Angular",
      "PWA",
      "Node.js",
      "NestJS",
      "TypeScript",
      "Go",
      "PHP",
      "PostgreSQL",
      "MongoDB",
      "AWS",
      "WebSockets",
      "Jest",
    ],
  },
  {
    id: "efrete",
    company: "e-Frete",
    period: { start: "2019-03", end: "2020-03" },
    stack: ["React", "Node.js", "TypeScript", "JavaScript", "C#/.NET", "Redis", "SQL", "REST APIs"],
  },
  {
    id: "nox",
    company: "NOX Gerenciamento e Monitoramento de Riscos",
    period: { start: "2016-01", end: "2019-03" },
    stack: ["PHP", "JavaScript", "Node.js", "React", "React Native", ".NET", "Java", "MySQL", "AWS"],
  },
];
