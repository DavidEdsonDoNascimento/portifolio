import type { SkillGroup } from "@/types/content";

export const skills: SkillGroup[] = [
  { id: "frontend", items: ["React", "Next.js", "Angular", "TypeScript", "React Native"] },
  { id: "backend", items: ["Node.js", "NestJS", "Fastify", "Go", "REST APIs", "WebSockets"] },
  { id: "data", items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "RabbitMQ", "BullMQ"] },
  { id: "cloud", items: ["AWS", "Docker", "Kubernetes", "CI/CD"] },
  {
    id: "quality",
    items: ["Jest", { key: "automatedTesting" }, { key: "integrationTesting" }, { key: "observability" }],
  },
];
