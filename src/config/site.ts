export const siteConfig = {
  name: "DEV / PORTFOLIO",
  title: "Senior Full Stack Software Engineer",
  description:
    "Portfolio of a Senior Full Stack Software Engineer building scalable applications, real-time integrations, and thoughtful digital experiences.",
  locale: "en",
  nav: [
    { label: "Work", href: "#work" },
    { label: "Experience", href: "#experience" },
    { label: "Lab", href: "#lab" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  // Fill in `href` when the real links are available. `null` renders a placeholder.
  contact: [
    { id: "github", label: "GitHub", href: null as string | null },
    { id: "linkedin", label: "LinkedIn", href: null as string | null },
    { id: "email", label: "Email", href: null as string | null },
  ],
} as const;
