// Builds the public resume PDFs (EN + PT-BR) from the same data and messages the
// site uses, so the document can only contain content already published on the
// portfolio. It never reads anything from /private.
//
// Usage: pnpm resume:build   (needs a local Chrome/Chromium; set CHROME_BIN to override)
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { siteConfig } from "../src/config/site.ts";
import { education } from "../src/data/education.ts";
import { experience } from "../src/data/experience.ts";
import { skills } from "../src/data/skills.ts";
import { formatMonthYear, formatPeriod } from "../src/lib/format.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "resume");
const fontsDir = path.join(root, "src", "assets", "fonts");
const chrome = process.env.CHROME_BIN ?? "google-chrome";

const LOCALES = {
  en: { file: "David-Nascimento-Resume-EN.pdf", lang: "en", intl: "en-US" },
  pt: { file: "David-Nascimento-Curriculo-PT.pdf", lang: "pt-BR", intl: "pt-BR" },
};

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const fontUrl = (f) => pathToFileURL(path.join(fontsDir, f)).href;
const stripScheme = (url) => url.replace(/^https?:\/\//, "");

function html(locale) {
  const meta = LOCALES[locale];
  const m = JSON.parse(readFileSync(path.join(root, "messages", `${locale}.json`), "utf8"));
  const tech = (item) => (typeof item === "string" ? item : m.tech[item.key]);
  const contact = Object.fromEntries(siteConfig.contact.map((c) => [c.id, c]));

  const experienceHtml = experience
    .map((e) => {
      const t = m.experience.items[e.id];
      const bullets = t.highlights.map((h) => `<li>${esc(h)}</li>`).join("");
      return `<article>
        <div class="row"><h3>${esc(e.company)}</h3><span class="when">${esc(formatPeriod(meta.intl, e.period.start, e.period.end))}</span></div>
        <p class="role">${esc(t.role)}${t.project ? ` · ${esc(t.project)}` : ""}</p>
        <ul>${bullets}</ul>
        ${e.stack ? `<p class="stack"><b>${esc(m.resume.technologies)}:</b> ${esc(e.stack.map(tech).join(", "))}</p>` : ""}
      </article>`;
    })
    .join("");

  const skillsHtml = skills
    .map((g) => `<p><b>${esc(m.about.skills.groups[g.id])}:</b> ${esc(g.items.map(tech).join(", "))}</p>`)
    .join("");

  const educationHtml = education
    .map((e) => {
      const when = e.inProgressSince
        ? m.about.education.inProgressSince.replace("{date}", formatMonthYear(meta.intl, e.inProgressSince))
        : String(e.completedYear);
      return `<p><b>${esc(m.about.education.items[e.id].degree)}</b> — ${esc(e.institution)}<span class="when"> · ${esc(when)}</span></p>`;
    })
    .join("");

  const title = m.resume.title.replace("{name}", siteConfig.name);
  return `<!doctype html>
<html lang="${meta.lang}"><head><meta charset="utf-8"><title>${esc(title)}</title>
<style>
@font-face{font-family:"SG";font-weight:400;src:url("${fontUrl("space-grotesk-latin-400-normal.woff")}")}
@font-face{font-family:"SG";font-weight:700;src:url("${fontUrl("space-grotesk-latin-700-normal.woff")}")}
@page{size:A4;margin:15mm 16mm}
*{box-sizing:border-box}
body{margin:0;font:9.4pt/1.42 "SG",Arial,sans-serif;color:#15191c}
h1{font-size:24pt;line-height:1.1;margin:0;letter-spacing:-.4pt}
.title{font-size:11.5pt;color:#3d6a00;font-weight:700;margin:3pt 0 6pt}
.contact{font-size:8.8pt;color:#374046;margin:0}
.contact a{color:inherit;text-decoration:none}
.contact span{white-space:nowrap}
h2{font-size:9pt;letter-spacing:1.2pt;text-transform:uppercase;color:#3d6a00;border-bottom:.6pt solid #c9d1c6;padding-bottom:2pt;margin:13pt 0 6pt}
p{margin:0 0 4pt}
article{break-inside:avoid;margin:0 0 8pt}
.row{display:flex;justify-content:space-between;align-items:baseline;gap:12pt}
h3{font-size:10.6pt;margin:0}
.when{color:#5a656b;font-size:8.6pt;white-space:nowrap}
.role{color:#2a3236;font-weight:700;margin:0 0 3pt}
ul{margin:0 0 3pt;padding-left:12pt}
li{margin:0 0 2pt}
.stack{color:#374046;font-size:8.6pt;margin:3pt 0 0}
</style></head><body>
<h1>${esc(siteConfig.name)}</h1>
<p class="title">${esc(m.hero.role)}</p>
<p class="contact"><span>${esc(m.about.facts.location)}</span> · <span><a href="${contact.email.href}">${esc(contact.email.value)}</a></span> ·
<span><a href="${contact.github.href}">${esc(stripScheme(contact.github.href))}</a></span> ·
<span><a href="${contact.linkedin.href}">${esc(stripScheme(contact.linkedin.href))}</a></span></p>
<h2>${esc(m.resume.summary)}</h2>
${m.about.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}
<h2>${esc(m.resume.experience)}</h2>
${experienceHtml}
<h2>${esc(m.resume.skills)}</h2>
${skillsHtml}
<h2>${esc(m.resume.education)}</h2>
${educationHtml}
</body></html>`;
}

/**
 * Blanks Creator (it carries the full Chrome user-agent string), Producer and the
 * dates in the Info dictionary. Same-length replacement keeps the xref offsets
 * valid; only the document Title is kept.
 */
function scrubInfo(file) {
  const raw = readFileSync(file).toString("latin1");
  const scrubbed = raw.replace(
    /\/(Creator|Producer|CreationDate|ModDate) \(((?:[^()\\]|\\.)*)\)/g,
    (_, key, value) => `/${key} (${" ".repeat(value.length)})`,
  );
  writeFileSync(file, Buffer.from(scrubbed, "latin1"));
}

mkdirSync(outDir, { recursive: true });
const tmp = mkdtempSync(path.join(tmpdir(), "resume-"));
try {
  for (const [locale, meta] of Object.entries(LOCALES)) {
    const page = path.join(tmp, `${locale}.html`);
    writeFileSync(page, html(locale));
    execFileSync(chrome, [
      "--headless=new",
      "--no-sandbox",
      "--disable-gpu",
      "--no-pdf-header-footer",
      `--print-to-pdf=${path.join(outDir, meta.file)}`,
      pathToFileURL(page).href,
    ], { stdio: "ignore" });
    scrubInfo(path.join(outDir, meta.file));
    console.log(`built public/resume/${meta.file}`);
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
