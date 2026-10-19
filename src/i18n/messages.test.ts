import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { siteConfig } from "../config/site.ts";
import { education } from "../data/education.ts";
import { experience } from "../data/experience.ts";
import { projects } from "../data/projects.ts";
import { skills } from "../data/skills.ts";
import { formatMonthYear, formatPeriod } from "../lib/format.ts";
import { EVENT_TYPES, SERVICES } from "../lib/packet-rush.ts";

type Json = string | Json[] | { [key: string]: Json };

const LOCALES = ["en", "pt"] as const;
const load = (locale: string): Record<string, Json> =>
  JSON.parse(readFileSync(`messages/${locale}.json`, "utf8"));
const messages = { en: load("en"), pt: load("pt") };

/** Flattens to "a.b[0].c" -> string. */
function flatten(value: Json, path = "", out: Record<string, string> = {}) {
  if (typeof value === "string") out[path] = value;
  else if (Array.isArray(value)) value.forEach((v, i) => flatten(v, `${path}[${i}]`, out));
  else for (const [k, v] of Object.entries(value)) flatten(v, path ? `${path}.${k}` : k, out);
  return out;
}
const flat = { en: flatten(messages.en), pt: flatten(messages.pt) };

const get = (locale: "en" | "pt", path: string): Json | undefined =>
  path.split(".").reduce<Json | undefined>((node, key) => {
    if (node === undefined || typeof node === "string") return undefined;
    return Array.isArray(node) ? undefined : node[key];
  }, messages[locale]);

const placeholders = (text: string) => [...text.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();

// Texts that are intentionally identical in English and Portuguese
// (proper names, acronyms and technical tokens).
const SAME_IN_BOTH = new Set([
  "navigation.language.en",
  "navigation.language.pt",
  "architecture.nodes.gateway.label",
  "architecture.nodes.gateway.sub",
  "architecture.nodes.realtime.label",
  "architecture.nodes.database.sub",
  "projects.items.realtime-integration-engine.context",
  "projects.items.antero-sistemas-website.title",
  "projects.visual.pwa.label",
  "about.skills.groups.frontend",
  "about.skills.groups.backend",
  "contact.labels.linkedin",
  "contact.labels.github",
  "packetRush.status.label",
  "packetRush.intro.title",
  "packetRush.playing.seconds",
]);

describe("message files", () => {
  it("have exactly the same keys, including array lengths", () => {
    assert.deepEqual(Object.keys(flat.pt).sort(), Object.keys(flat.en).sort());
  });

  it("have no empty strings", () => {
    for (const locale of LOCALES) {
      for (const [path, text] of Object.entries(flat[locale])) {
        assert.ok(text.trim().length > 0, `${locale}: empty message at ${path}`);
      }
    }
  });

  it("use the same placeholders in both languages", () => {
    for (const [path, text] of Object.entries(flat.en)) {
      assert.deepEqual(placeholders(flat.pt[path]), placeholders(text), `placeholders differ at ${path}`);
    }
  });

  it("do not leave Portuguese messages identical to English by accident", () => {
    const same = Object.keys(flat.en).filter((path) => flat.en[path] === flat.pt[path]);
    const unexpected = same.filter((path) => !SAME_IN_BOTH.has(path));
    assert.deepEqual(unexpected, [], `untranslated: ${unexpected.join(", ")}`);
  });
});

describe("content ids are covered by the messages", () => {
  it("projects", () => {
    for (const locale of LOCALES) {
      for (const p of projects) {
        for (const field of ["category", "title", "context", "description", "highlights", "visualCaption"]) {
          assert.ok(get(locale, `projects.items.${p.id}.${field}`), `${locale}: projects.items.${p.id}.${field}`);
        }
        if (p.link) assert.ok(get(locale, `projects.links.${p.link.kind}`), `${locale}: link ${p.link.kind}`);
      }
    }
  });

  it("experience (role + highlights; optional project label is consistent across languages)", () => {
    for (const e of experience) {
      for (const locale of LOCALES) {
        assert.ok(get(locale, `experience.items.${e.id}.role`), `${locale}: role of ${e.id}`);
        assert.ok(get(locale, `experience.items.${e.id}.highlights`), `${locale}: highlights of ${e.id}`);
      }
      assert.equal(
        get("en", `experience.items.${e.id}.project`) === undefined,
        get("pt", `experience.items.${e.id}.project`) === undefined,
        `project label of ${e.id} exists in only one language`,
      );
    }
    assert.equal(experience.length, 6);
  });

  it("education, skills, navigation and contact", () => {
    for (const locale of LOCALES) {
      for (const e of education) assert.ok(get(locale, `about.education.items.${e.id}.degree`), `${locale}: ${e.id}`);
      for (const g of skills) assert.ok(get(locale, `about.skills.groups.${g.id}`), `${locale}: skill group ${g.id}`);
      for (const n of siteConfig.nav) assert.ok(get(locale, `navigation.${n.id}`), `${locale}: nav ${n.id}`);
      for (const c of siteConfig.contact) assert.ok(get(locale, `contact.labels.${c.id}`), `${locale}: contact ${c.id}`);
    }
  });

  it("translated technology labels", () => {
    const keys = [...projects.flatMap((p) => p.technologies), ...experience.flatMap((e) => e.stack ?? []), ...skills.flatMap((g) => g.items)]
      .filter((t): t is { key: string } => typeof t !== "string")
      .map((t) => t.key);
    assert.ok(keys.length > 0);
    for (const locale of LOCALES) for (const key of keys) assert.ok(get(locale, `tech.${key}`), `${locale}: tech.${key}`);
  });

  it("Packet Rush event and service descriptions match the game rules", () => {
    for (const locale of LOCALES) {
      for (const type of EVENT_TYPES) assert.ok(get(locale, `packetRush.events.${type}`), `${locale}: event ${type}`);
      for (const service of SERVICES) assert.ok(get(locale, `packetRush.services.${service}`), `${locale}: service ${service}`);
    }
  });
});

describe("date formatting", () => {
  it("keeps the approved English format", () => {
    assert.equal(formatMonthYear("en-US", "2026-08"), "Aug 2026");
    assert.equal(formatPeriod("en-US", "2024-04", "2026-05"), "Apr 2024 – May 2026");
  });

  it("uses Brazilian month abbreviations without the trailing dot", () => {
    assert.equal(formatMonthYear("pt-BR", "2026-08"), "ago 2026");
    assert.equal(formatPeriod("pt-BR", "2024-04", "2026-05"), "abr 2024 – mai 2026");
    for (let m = 1; m <= 12; m++) {
      const text = formatMonthYear("pt-BR", `2026-${String(m).padStart(2, "0")}`);
      assert.match(text, /^[a-zç]{3} 2026$/, text);
    }
  });
});
