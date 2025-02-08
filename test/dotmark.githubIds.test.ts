import { describe, test, expect } from "vitest";
import { textToGitHubId } from "../src/dotmark";

describe("GitHub ID Generation", () => {
  test("converts header to GitHub ID", () => {
    const cases = [
      ["", ""], // Empty string
      ["Test Zero", "test-zero"], // Text to kebab case
      ["Test, Zero!", "test-zero"], // Comma
      ["Test, Zero, Zero!", "test-zero-zero"], // Consecutive commas
      //   ["Test  Zero", "test-zero"], // TODO: Multiple spaces ?? probably need to handle...
      ["Test-Two", "test-two"], // Hyphenated
      ["Test - One", "test---one"], // Hyphen space mix
      ["Test: Three", "test-three"], // Colons
      ["Test:Four", "testfour"], // No space around colon
      ["Test & Special @ Characters!", "test--special--characters"], // Multiple specials
      ["Test && More", "test--more"], // Consecutive specials
      ["Test! Test!", "test-test"], // Consecutive specials at edges
    ];

    cases.forEach(([input, expected]) => {
      expect(textToGitHubId(input)).toBe(expected);
    });
  });
});
