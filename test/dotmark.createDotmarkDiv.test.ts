import { DOTMARK_TOKEN, createDotmarkDiv } from "../src/dotmark.ts";

describe("createDotmarkDiv", () => {
  it("creates div without id or classes", () => {
    const result = createDotmarkDiv();
    expect(result).toBe(`<!--${DOTMARK_TOKEN}<div>${DOTMARK_TOKEN}-->`);
  });

  it("creates div with id only", () => {
    const result = createDotmarkDiv("test-id");
    expect(result).toBe(
      `<!--${DOTMARK_TOKEN}<div id="test-id">${DOTMARK_TOKEN}-->`
    );
  });

  it("handles empty class array", () => {
    const result = createDotmarkDiv("test-id", []);
    expect(result).toBe(
      `<!--${DOTMARK_TOKEN}<div id="test-id">${DOTMARK_TOKEN}-->`
    );
  });

  it("creates div with classes only", () => {
    const result = createDotmarkDiv(undefined, ["class1", "class2"]);
    expect(result).toBe(
      `<!--${DOTMARK_TOKEN}<div class="class1 class2">${DOTMARK_TOKEN}-->`
    );
  });

  it("creates div with multiple classes", () => {
    const result = createDotmarkDiv(undefined, ["class1", "class2", "class3"]);
    expect(result).toBe(
      `<!--${DOTMARK_TOKEN}<div class="class1 class2 class3">${DOTMARK_TOKEN}-->`
    );
  });

  it("creates div with id and classes", () => {
    const result = createDotmarkDiv("test-id", ["class1", "class2"]);
    expect(result).toBe(
      `<!--${DOTMARK_TOKEN}<div id="test-id" class="class1 class2">${DOTMARK_TOKEN}-->`
    );
  });
});
