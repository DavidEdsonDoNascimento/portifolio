/** Language-independent site facts. All visible copy lives in /messages. */
export const siteConfig = {
  // Name shown in the header, footer and metadata. Change it here.
  name: "David Nascimento",
  owner: {
    fullName: "David Edson do Nascimento",
  },
  nav: [
    { id: "work", href: "#work" },
    { id: "experience", href: "#experience" },
    { id: "lab", href: "#lab" },
    { id: "about", href: "#about" },
    { id: "contact", href: "#contact" },
  ],
  stack: ["TypeScript", "React", "Next.js", "Node.js", "NestJS", "Docker"],
  contact: [
    {
      id: "linkedin",
      value: "in/david-nascimento-05989a177",
      href: "https://linkedin.com/in/david-nascimento-05989a177",
      external: true,
    },
    {
      id: "github",
      value: "DavidEdsonDoNascimento",
      href: "https://github.com/DavidEdsonDoNascimento",
      external: true,
    },
    {
      id: "email",
      value: "david.contato.tec@gmail.com",
      href: "mailto:david.contato.tec@gmail.com",
      external: false,
    },
  ],
} as const;
