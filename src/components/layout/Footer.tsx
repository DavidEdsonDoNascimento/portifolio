import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-border border-t">
      <div className="text-muted mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs tracking-wider">{siteConfig.name}</p>
        <p>Built with Next.js, TypeScript and Tailwind CSS.</p>
        <a href="#top" className="hover:text-primary transition-colors">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
