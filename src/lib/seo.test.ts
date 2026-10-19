import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { describe, it } from "node:test";
import { siteConfig } from "../config/site.ts";
import { absoluteUrl, buildRobots, buildSitemap, languageUrls, localePath, pageAlternates, robotsMeta } from "./seo.ts";

const ORIGIN = "https://portfolio.example.com";
const read = (file: string) => readFileSync(file, "utf8");
const messages = { en: JSON.parse(read("messages/en.json")), pt: JSON.parse(read("messages/pt.json")) };

describe("canonical and hreflang", () => {
  it("maps English to the root and Portuguese to /pt", () => {
    assert.equal(localePath("en"), "/");
    assert.equal(localePath("pt"), "/pt");
  });

  it("builds absolute canonical URLs per language", () => {
    assert.equal(pageAlternates(ORIGIN, "en").canonical, `${ORIGIN}/`);
    assert.equal(pageAlternates(ORIGIN, "pt").canonical, `${ORIGIN}/pt`);
  });

  it("declares en, pt-BR and x-default (English)", () => {
    assert.deepEqual(languageUrls(ORIGIN), {
      en: `${ORIGIN}/`,
      "pt-BR": `${ORIGIN}/pt`,
      "x-default": `${ORIGIN}/`,
    });
    assert.equal(absoluteUrl(ORIGIN, "/sitemap.xml"), `${ORIGIN}/sitemap.xml`);
  });
});

describe("indexing is opt-in", () => {
  it("is noindex until a valid public URL exists", () => {
    assert.deepEqual(robotsMeta(false), { index: false, follow: false });
    assert.deepEqual(robotsMeta(true), { index: true, follow: true });
  });

  it("sitemap is empty without a domain and lists only the two public pages with one", () => {
    assert.deepEqual(buildSitemap(null), []);
    const entries = buildSitemap(ORIGIN);
    assert.deepEqual(entries.map((e) => e.url), [`${ORIGIN}/`, `${ORIGIN}/pt`]);
    for (const entry of entries) assert.deepEqual(entry.alternates?.languages, languageUrls(ORIGIN));
    assert.ok(!JSON.stringify(entries).includes("/api"), "infrastructure routes must not be listed");
    assert.ok(!JSON.stringify(entries).includes("localhost"));
  });

  it("robots blocks everything without a domain and references the absolute sitemap with one", () => {
    assert.deepEqual(buildRobots(null), { rules: { userAgent: "*", disallow: "/" } });
    const robots = buildRobots(ORIGIN);
    assert.equal(robots.sitemap, `${ORIGIN}/sitemap.xml`);
    assert.deepEqual(robots.rules, { userAgent: "*", allow: "/", disallow: "/api/" });
  });
});

describe("approved metadata copy", () => {
  it("English", () => {
    assert.equal(messages.en.metadata.title.replace("{name}", siteConfig.name), "David Nascimento | Senior Full Stack Software Engineer");
    assert.equal(
      messages.en.metadata.description,
      "Senior Full Stack Software Engineer with 10+ years of experience building scalable applications, real-time integrations, enterprise platforms and custom software solutions.",
    );
  });

  it("Portuguese", () => {
    assert.equal(messages.pt.metadata.title.replace("{name}", siteConfig.name), "David Nascimento | Engenheiro de Software Full Stack Sênior");
    assert.equal(
      messages.pt.metadata.description,
      "Engenheiro de Software Full Stack Sênior com mais de 10 anos de experiência em aplicações escaláveis, integrações em tempo real, plataformas corporativas e soluções sob medida.",
    );
  });
});

describe("public files and ignore rules", () => {
  it("resume links point to existing PDFs", () => {
    for (const href of Object.values(siteConfig.resume)) {
      assert.ok(existsSync(`public${href}`), `missing public${href}`);
      assert.equal(readFileSync(`public${href}`).subarray(0, 5).toString(), "%PDF-");
    }
  });

  it("public/ only contains the resume PDFs (no private or template assets)", () => {
    const allowed = new Set([".gitkeep", "resume"]);
    for (const name of readdirSync("public")) assert.ok(allowed.has(name), `unexpected public/${name}`);
    for (const name of readdirSync("public/resume")) assert.match(name, /\.pdf$/);
  });

  it("private files and the template reference are never versioned or sent to Docker", () => {
    const git = read(".gitignore").split("\n");
    const docker = read(".dockerignore").split("\n");
    assert.ok(git.includes("/private/"), ".gitignore must list /private/");
    assert.ok(git.includes("/ref/"), ".gitignore must list /ref/");
    assert.ok(docker.includes("private/"), ".dockerignore must list private/");
    assert.ok(docker.includes("ref/"), ".dockerignore must list ref/");
  });

  it("the page metadata files exist", () => {
    for (const file of ["src/app/sitemap.ts", "src/app/robots.ts", "src/app/icon.svg", "src/app/apple-icon.png", "src/app/favicon.ico", "src/app/og/en.png/route.tsx", "src/app/og/pt.png/route.tsx"]) {
      assert.ok(existsSync(file), `missing ${file}`);
    }
  });
});
