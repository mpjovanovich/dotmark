import { expect, describe, test } from "vitest";
import { isMacroStart, isMacroEnd } from "../src/dotmark";

describe("isMacroEnd", () => {
  test("identifies correct macro end", () => {
    expect(isMacroEnd("/~")).toBe(true);
  });

  test("rejects invalid macro ends", () => {
    expect(isMacroEnd("")).toBe(false);
    expect(isMacroEnd("/")).toBe(false);
    expect(isMacroEnd("~")).toBe(false);
    expect(isMacroEnd("~/")).toBe(false);
    expect(isMacroEnd("/ ~")).toBe(false);
  });
});

describe("isMacroStart", () => {
  test("identifies id macro starts", () => {
    expect(isMacroStart("~#id")).toBe(true);
  });

  test("identifies class macro starts", () => {
    expect(isMacroStart("~.class")).toBe(true);
  });

  test("rejects invalid macro starts", () => {
    expect(isMacroStart("~")).toBe(false);
    expect(isMacroStart(".")).toBe(false);
    expect(isMacroStart(".class")).toBe(false);
    expect(isMacroStart("#")).toBe(false);
    expect(isMacroStart("#id")).toBe(false);
  });
});
