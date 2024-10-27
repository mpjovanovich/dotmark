import { PRETTYMARK_TOKEN, createPrettyMarkDiv } from "../src/prettyMark.ts";

describe("createPrettyMarkDiv", () => {
  it("creates div without id or classes", () => {
    const result = createPrettyMarkDiv();
    expect(result).toBe(`<!--${PRETTYMARK_TOKEN}<div>${PRETTYMARK_TOKEN}-->`);
  });

  it("creates div with id only", () => {
    const result = createPrettyMarkDiv("test-id");
    expect(result).toBe(
      `<!--${PRETTYMARK_TOKEN}<div id="test-id">${PRETTYMARK_TOKEN}-->`
    );
  });

  it("handles empty class array", () => {
    const result = createPrettyMarkDiv("test-id", []);
    expect(result).toBe(
      `<!--${PRETTYMARK_TOKEN}<div id="test-id">${PRETTYMARK_TOKEN}-->`
    );
  });

  it("creates div with classes only", () => {
    const result = createPrettyMarkDiv(undefined, ["class1", "class2"]);
    expect(result).toBe(
      `<!--${PRETTYMARK_TOKEN}<div class="class1 class2">${PRETTYMARK_TOKEN}-->`
    );
  });

  it("creates div with multiple classes", () => {
    const result = createPrettyMarkDiv(undefined, [
      "class1",
      "class2",
      "class3",
    ]);
    expect(result).toBe(
      `<!--${PRETTYMARK_TOKEN}<div class="class1 class2 class3">${PRETTYMARK_TOKEN}-->`
    );
  });

  it("creates div with id and classes", () => {
    const result = createPrettyMarkDiv("test-id", ["class1", "class2"]);
    expect(result).toBe(
      `<!--${PRETTYMARK_TOKEN}<div id="test-id" class="class1 class2">${PRETTYMARK_TOKEN}-->`
    );
  });
});
