export type ProjectVisualKind = "integration" | "orders" | "website";

export type ProjectLink = {
  label: string;
  href: string;
  /** "private" links point to an application that requires authentication. */
  kind: "public" | "private";
};

export type Project = {
  id: string;
  category: string;
  title: string;
  /** Short line about where/how the work was done. */
  context: string;
  description: string;
  highlights: string[];
  /** Only technologies confirmed for this project. */
  technologies: string[];
  visual: ProjectVisualKind;
  visualCaption: string;
  featured?: boolean;
  link?: ProjectLink;
};

export type ExperienceEntry = {
  id: string;
  company: string;
  project?: string;
  role: string;
  period: string;
  highlights: string[];
  stack?: string[];
};

export type SkillGroup = {
  id: string;
  title: string;
  items: string[];
};

export type EducationEntry = {
  id: string;
  degree: string;
  institution: string;
  period: string;
};
