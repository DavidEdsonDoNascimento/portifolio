export const siteConfig = {
  // Name shown in the header, footer and metadata. Change it here.
  name: "David Nascimento",
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
  stack: ["TypeScript", "React", "Next.js", "Node.js", "NestJS", "Docker"],
  owner: {
    fullName: "David Edson do Nascimento",
    location: "Santa Catarina, Brazil",
    experience: "10+ years",
  },
  contact: [
    {
      id: "linkedin",
      label: "LinkedIn",
      value: "in/david-nascimento-05989a177",
      href: "https://linkedin.com/in/david-nascimento-05989a177",
      external: true,
    },
    {
      id: "github",
      label: "GitHub",
      value: "DavidEdsonDoNascimento",
      href: "https://github.com/DavidEdsonDoNascimento",
      external: true,
    },
    {
      id: "email",
      label: "Email",
      value: "david.contato.tec@gmail.com",
      href: "mailto:david.contato.tec@gmail.com",
      external: false,
    },
  ],
} as const;
