/**
 * Structural content only (ids, URLs, companies, technologies, dates).
 * Every translatable string lives in /messages/<locale>.json under a key
 * derived from the entry `id`.
 */

/** A technology name, or a key into `messages.tech` when the label is translated. */
export type TechItem = string | { key: string };

export type ProjectVisualKind = "integration" | "orders" | "website";

export type ProjectLink = {
  href: string;
  /** "private" links point to an application that requires authentication. */
  kind: "public" | "private";
};

export type Project = {
  id: string;
  visual: ProjectVisualKind;
  /** Only technologies confirmed for this project. */
  technologies: TechItem[];
  featured?: boolean;
  link?: ProjectLink;
};

export type ExperienceEntry = {
  id: string;
  company: string;
  /** "YYYY-MM" */
  period: { start: string; end: string };
  stack?: TechItem[];
};

export type SkillGroup = {
  id: string;
  items: TechItem[];
};

export type EducationEntry = {
  id: string;
  institution: string;
  /** Exactly one of the two is set. */
  completedYear?: number;
  /** "YYYY-MM" */
  inProgressSince?: string;
};
