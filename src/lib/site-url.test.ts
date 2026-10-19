import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parseSiteUrl } from "./site-url.ts";

const ok = (raw: string) => {
  const result = parseSiteUrl(raw);
  assert.ok(result.configured, `expected ${raw} to be accepted`);
  return result.origin;
};
const rejected = (raw: string | undefined) => {
  const result = parseSiteUrl(raw);
  assert.equal(result.configured, false, `expected ${raw} to be rejected`);
  return result.configured ? "" : result.reason;
};

describe("parseSiteUrl", () => {
  it("accepts an HTTPS public origin and normalizes it", () => {
    assert.equal(ok("https://example.com"), "https://example.com");
    assert.equal(ok("https://example.com/"), "https://example.com");
    assert.equal(ok("  https://Portfolio.Example.COM/  "), "https://portfolio.example.com");
  });

  it("treats an unset or blank value as not configured", () => {
    assert.match(rejected(undefined), /not set/);
    assert.match(rejected(""), /not set/);
    assert.match(rejected("   "), /not set/);
  });

  it("requires an absolute https URL", () => {
    assert.match(rejected("example.com"), /absolute/);
    assert.match(rejected("http://example.com"), /https/);
    assert.match(rejected("//example.com"), /absolute/);
  });

  it("rejects credentials, query strings, fragments, paths and ports", () => {
    assert.match(rejected("https://user:pass@example.com"), /credentials/);
    assert.match(rejected("https://user@example.com"), /credentials/);
    assert.match(rejected("https://example.com?x=1"), /query|fragment/);
    assert.match(rejected("https://example.com/?"), /query|fragment/);
    assert.match(rejected("https://example.com#top"), /query|fragment/);
    assert.match(rejected("https://example.com/portfolio"), /path/);
    assert.match(rejected("https://example.com:8443"), /port/);
  });

  it("never accepts local or IP addresses as the public URL", () => {
    for (const host of [
      "https://localhost",
      "https://app.localhost",
      "https://127.0.0.1",
      "https://192.168.0.10",
      "https://[::1]",
      "https://myserver",
      "https://printer.local",
      "https://svc.internal",
    ]) {
      assert.match(rejected(host), /public domain/, host);
    }
  });
});
