import { expect, describe, test } from "vitest";
import { embedDotmarkTokens, removeDotmarkTokens } from "../src/dotmark";
import { DOTMARK_TOKEN } from "../src/dotmark";

describe("embedDotmarkTokens", () => {
  test("creates empty div when no parameters provided", () => {
    expect(embedDotmarkTokens()).toBe(
      `<!--${DOTMARK_TOKEN}<div>${DOTMARK_TOKEN}-->`
    );
  });

  test("creates div with id", () => {
    expect(embedDotmarkTokens("testId")).toBe(
      `<!--${DOTMARK_TOKEN}<div id="testId">${DOTMARK_TOKEN}-->`
    );
  });

  test("creates div with single class", () => {
    expect(embedDotmarkTokens(undefined, ["testClass"])).toBe(
      `<!--${DOTMARK_TOKEN}<div class="testClass">${DOTMARK_TOKEN}-->`
    );
  });

  test("creates div with multiple classes", () => {
    expect(embedDotmarkTokens(undefined, ["class1", "class2"])).toBe(
      `<!--${DOTMARK_TOKEN}<div class="class1 class2">${DOTMARK_TOKEN}-->`
    );
  });

  test("creates div with both id and classes", () => {
    expect(embedDotmarkTokens("testId", ["class1", "class2"])).toBe(
      `<!--${DOTMARK_TOKEN}<div id="testId" class="class1 class2">${DOTMARK_TOKEN}-->`
    );
  });
});

describe("removeDotmarkTokens", () => {
  test("removes single token pair", () => {
    const input = `<!--${DOTMARK_TOKEN}content${DOTMARK_TOKEN}-->`;
    expect(removeDotmarkTokens(input)).toBe("content");
  });

  test("removes multiple token pairs", () => {
    const input = `<!--${DOTMARK_TOKEN}first${DOTMARK_TOKEN}--><!--${DOTMARK_TOKEN}second${DOTMARK_TOKEN}-->`;
    expect(removeDotmarkTokens(input)).toBe("firstsecond");
  });

  test("preserves non-token content", () => {
    const input = `before<!--${DOTMARK_TOKEN}content${DOTMARK_TOKEN}-->after`;
    expect(removeDotmarkTokens(input)).toBe("beforecontentafter");
  });

  test("handles text without tokens", () => {
    const input = "plain text";
    expect(removeDotmarkTokens(input)).toBe("plain text");
  });
});
