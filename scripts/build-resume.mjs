// Builds the public resume PDFs (EN + PT-BR). Wording lives in resume-content.mjs;
// companies, periods, tech stacks, education dates and contact links come from the
// same data the website uses. It never reads anything from /private.
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
import { formatMonthYear, formatPeriod } from "../src/lib/format.ts";
import { content } from "./resume-content.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "resume");
const fontsDir = path.join(root, "src", "assets", "fonts");
const chrome = process.env.CHROME_BIN ?? "google-chrome";

// Public URL of the portfolio (the domain is not live yet; it is the planned address).
const WEBSITE = "https://davidnascimento.io";

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const fontUrl = (f) => pathToFileURL(path.join(fontsDir, f)).href;
const stripScheme = (url) => url.replace(/^https?:\/\//, "");

/** Stack shown per job: site data, with the two corrections the detailed resume requires. */
function stackFor(entry, messages) {
  const tech = (item) => (typeof item === "string" ? item : messages.tech[item.key]);
  let stack = (entry.stack ?? []).map(tech);
  if (entry.id === "videosoft" && !stack.includes("JavaScript")) {
    stack.splice(stack.indexOf("TypeScript") + 1, 0, "JavaScript");
  }
  if (entry.id === "nox") stack = stack.map((s) => (s === "AWS" ? "AWS SQS/SNS" : s));
  // The Antero entry mixes unrelated projects (hardware app, Next.js platform, website),
  // so its technologies are named inside each bullet instead of in a shared list.
  if (entry.id === "antero") return [];
  return stack;
}

/** Same facts in both languages: fail loudly if the two texts drift apart. */
function assertEquivalent() {
  const en = content.en;
  const pt = content.pt;
  const ids = experience.map((e) => e.id);
  for (const id of ids) {
    if (!en.experience[id] || !pt.experience[id]) throw new Error(`missing resume text for ${id}`);
    if (en.experience[id].bullets.length !== pt.experience[id].bullets.length) {
      throw new Error(`bullet count differs for ${id}`);
    }
    if (Boolean(en.experience[id].project) !== Boolean(pt.experience[id].project)) {
      throw new Error(`project label differs for ${id}`);
    }
  }
  if (en.skills.length !== pt.skills.length) throw new Error("skill groups differ");
  if (en.languages.length !== pt.languages.length) throw new Error("languages differ");
}

function html(locale) {
  const c = content[locale];
  const messages = JSON.parse(readFileSync(path.join(root, "messages", `${locale}.json`), "utf8"));
  const contact = Object.fromEntries(siteConfig.contact.map((x) => [x.id, x]));

  const experienceHtml = experience
    .map((e) => {
      const t = c.experience[e.id];
      const stack = stackFor(e, messages);
      return `<article>
        <div class="row"><h3>${esc(t.company)}</h3><span class="when">${esc(formatPeriod(c.intl, e.period.start, e.period.end))}</span></div>
        <p class="role">${esc(t.role)}${t.project ? ` · ${esc(t.project)}` : ""}</p>
        <ul>${t.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
        ${stack.length ? `<p class="stack"><b>${esc(c.sections.technologies)}:</b> ${esc(stack.join(", "))}</p>` : ""}
      </article>`;
    })
    .join("");

  const skillsHtml = c.skills.map(([label, items]) => `<p><b>${esc(label)}:</b> ${esc(items)}</p>`).join("");

  const educationHtml = education
    .map((e) => {
      const when = e.inProgressSince
        ? c.education.inProgress.replace("{date}", formatMonthYear(c.intl, e.inProgressSince))
        : String(e.completedYear);
      return `<p><b>${esc(c.education[e.id])}</b> — ${esc(e.institution)} <span class="when">· ${esc(when)}</span></p>`;
    })
    .join("");

  const languagesHtml = c.languages.map(([lang, level]) => `<p><b>${esc(lang)}:</b> ${esc(level)}</p>`).join("");

  const title = c.title.replace("{name}", siteConfig.name);
  return `<!doctype html>
<html lang="${c.lang}"><head><meta charset="utf-8"><title>${esc(title)}</title>
<style>
@font-face{font-family:"SG";font-weight:400;src:url("${fontUrl("space-grotesk-latin-400-normal.woff")}")}
@font-face{font-family:"SG";font-weight:700;src:url("${fontUrl("space-grotesk-latin-700-normal.woff")}")}
@page{size:A4;margin:13mm 15mm}
*{box-sizing:border-box}
body{margin:0;font:10pt/1.4 "SG",Arial,sans-serif;color:#15191c}
h1{font-size:25pt;line-height:1.08;margin:0;letter-spacing:-.4pt}
.title{font-size:12pt;color:#3d6a00;font-weight:700;margin:3pt 0 0}
.tagline{font-size:9.4pt;color:#4a555b;margin:1pt 0 5pt;letter-spacing:.2pt}
.contact{font-size:9.2pt;color:#2f393f;margin:0}
.contact a{color:inherit;text-decoration:none}
.contact span{white-space:nowrap}
h2{font-size:9.6pt;letter-spacing:.2pt;text-transform:uppercase;color:#3d6a00;border-bottom:.6pt solid #c9d1c6;padding-bottom:2pt;margin:11pt 0 5pt;break-after:avoid}
p{margin:0 0 3.5pt}
article{break-inside:avoid;margin:0 0 7pt}
.row{display:flex;justify-content:space-between;align-items:baseline;gap:12pt}
h3{font-size:10.8pt;margin:0}
.when{color:#56616a;font-size:9pt;white-space:nowrap;font-weight:400}
.role{color:#2a3236;font-weight:700;margin:0 0 2.5pt}
ul{margin:0 0 2.5pt;padding-left:12pt}
li{margin:0 0 1.8pt}
.stack{color:#374046;font-size:9pt;margin:2.5pt 0 0}
.skills p{margin:0 0 2.5pt}
</style></head><body>
<h1>${esc(siteConfig.name)}</h1>
<p class="title">${esc(c.role)}</p>
<p class="tagline">${esc(c.tagline)}</p>
<p class="contact"><span>${esc(c.location)}</span> · <span><a href="${contact.email.href}">${esc(contact.email.value)}</a></span> ·
<span><a href="${contact.github.href}">${esc(stripScheme(contact.github.href))}</a></span> ·
<span><a href="${contact.linkedin.href}">${esc(stripScheme(contact.linkedin.href))}</a></span> ·
<span><a href="${WEBSITE}">${esc(stripScheme(WEBSITE))}</a></span></p>
<h2>${esc(c.sections.summary)}</h2>
<p>${esc(c.summary)}</p>
<h2>${esc(c.sections.skills)}</h2>
<div class="skills">${skillsHtml}</div>
<h2>${esc(c.sections.experience)}</h2>
${experienceHtml}
<h2>${esc(c.sections.education)}</h2>
${educationHtml}
<h2>${esc(c.sections.languages)}</h2>
${languagesHtml}
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

assertEquivalent();
mkdirSync(outDir, { recursive: true });
const tmp = mkdtempSync(path.join(tmpdir(), "resume-"));
try {
  for (const locale of Object.keys(content)) {
    const file = content[locale].file;
    const page = path.join(tmp, `${locale}.html`);
    writeFileSync(page, html(locale));
    execFileSync(
      chrome,
      [
        "--headless=new",
        "--no-sandbox",
        "--disable-gpu",
        "--no-pdf-header-footer",
        `--print-to-pdf=${path.join(outDir, file)}`,
        pathToFileURL(page).href,
      ],
      { stdio: "ignore" },
    );
    scrubInfo(path.join(outDir, file));
    console.log(`built public/resume/${file}`);
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
