import type { SkillGroup } from "@/types/content";

export const skills: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    items: ["React", "Next.js", "Angular", "TypeScript", "React Native"],
  },
  {
    id: "backend",
    title: "Backend",
    items: ["Node.js", "NestJS", "Fastify", "Go", "REST APIs", "WebSockets"],
  },
  {
    id: "data",
    title: "Data & Messaging",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "RabbitMQ", "BullMQ"],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    items: ["AWS", "Docker", "Kubernetes", "CI/CD"],
  },
  {
    id: "quality",
    title: "Engineering Quality",
    items: ["Jest", "Automated testing", "Integration testing", "Observability"],
  },
];
