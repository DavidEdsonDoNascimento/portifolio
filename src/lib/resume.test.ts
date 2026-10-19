import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { experience } from "../data/experience.ts";
import { content as rawContent } from "../../scripts/resume-content.mjs";

type Entry = { company: string; role: string; project?: string; bullets: string[] };
type Resume = {
  skills: string[][];
  languages: string[][];
  sections: Record<string, string>;
  education: Record<string, string>;
  experience: Record<string, Entry>;
};
const content = rawContent as unknown as Record<"en" | "pt", Resume>;

type Locale = "en" | "pt";
const locales: Locale[] = ["en", "pt"];

describe("resume content", () => {
  it("covers every experience in both languages with the same number of bullets", () => {
    for (const { id } of experience) {
      for (const l of locales) assert.ok(content[l].experience[id], `${l}: missing ${id}`);
      assert.equal(
        content.en.experience[id].bullets.length,
        content.pt.experience[id].bullets.length,
        `bullet count differs for ${id}`,
      );
      assert.equal(Boolean(content.en.experience[id].project), Boolean(content.pt.experience[id].project));
    }
  });

  it("keeps skills, languages and education aligned across languages", () => {
    assert.equal(content.en.skills.length, content.pt.skills.length);
    assert.equal(content.en.languages.length, content.pt.languages.length);
    assert.deepEqual(Object.keys(content.en.education).sort(), Object.keys(content.pt.education).sort());
    assert.deepEqual(Object.keys(content.en.sections).sort(), Object.keys(content.pt.sections).sort());
  });

  it("states the confirmed language levels without invented CEFR grades", () => {
    const all = JSON.stringify(content);
    assert.ok(!/\b(A1|A2|B1|B2|C1|C2)\b/.test(all), "no CEFR levels");
    assert.deepEqual(content.en.languages, [["Portuguese", "Native"], ["English", "Technical and professional communication"]]);
    assert.deepEqual(content.pt.languages, [["Português", "Nativo"], ["Inglês", "Comunicação técnica e profissional"]]);
  });

  it("presents the Lamp InPunto V2 only as planned and never as delivered", () => {
    assert.match(content.en.experience.antero.bullets.join(" "), /V2.*in planning/);
    assert.match(content.pt.experience.antero.bullets.join(" "), /V2.*em planejamento/);
  });

  it("keeps the website technologies out of the shared Antero entry and out of unrelated bullets", () => {
    for (const l of locales) {
      const bullets: string[] = content[l].experience.antero.bullets;
      const withResend = bullets.filter((b) => /Resend|Cloudflare/.test(b));
      assert.equal(withResend.length, 1, `${l}: Resend/Cloudflare must appear only in the website bullet`);
      assert.match(withResend[0], /(website|Site da Antero)/);
    }
  });

  it("contains no phone numbers, work-arrangement preferences or other private details", () => {
    const all = JSON.stringify(content);
    assert.ok(!/\+?\d[\d ()-]{8,}\d/.test(all), "no phone-like numbers");
    assert.ok(!/\b(CLT|PJ|CPF|CEP)\b/.test(all));
    assert.ok(!/@/.test(all), "contact details come from siteConfig, not from the copy");
  });
});
