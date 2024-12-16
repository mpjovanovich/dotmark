import { parseDotmark } from "../src/dotmark";

describe("parseDotmark", () => {
  test("syntax highlighting", async () => {
    const input = "```javascript\nconst x = 1;\n```";
    const output = await parseDotmark(input, true);
    expect(output).toContain('class="hljs language-javascript"');
    expect(output).toContain('<span class="hljs-keyword">const</span>');
  });

  test("GitHub-style IDs", async () => {
    const input =
      "# Test Heading\n# Test, Zero!\n# Test - One\n# Test-Two\n# Test: Three\n# Test:Four\n# Test & Special @ Characters!";
    const output = await parseDotmark(input, false, true);
    expect(output).toContain('<h1 id="test-heading">Test Heading</h1>');
    expect(output).toContain('<h1 id="test-zero">Test, Zero!</h1>');
    expect(output).toContain('<h1 id="test---one">Test - One</h1>');
    expect(output).toContain('<h1 id="test-two">Test-Two</h1>');
    expect(output).toContain('<h1 id="test-three">Test: Three</h1>');
    expect(output).toContain('<h1 id="testfour">Test:Four</h1>');
    expect(output).toContain(
      '<h1 id="test--special--characters">Test & Special @ Characters!</h1>'
    );
  });

  test("handles empty input", async () => {
    const input = "";
    const output = await parseDotmark(input);
    expect(output).toBe("");
  });

  test("input with no macros", async () => {
    const input = "# Hello\n\nThis is a paragraph.";
    const output = await parseDotmark(input);
    expect(output).toContain("<h1>Hello</h1>");
    expect(output).toContain("<p>This is a paragraph.</p>");
  });

  test("single macro with no line breaks", async () => {
    const input = "~#myId.myClass\nContent\n/~";
    const output = await parseDotmark(input);
    expect(output).toContain('<div id="myId" class="myClass">');
    expect(output).toContain("Content");
    expect(output).toContain("</div>");
  });

  test("single macro with line breaks", async () => {
    const input = "~#myId.myClass\n\nContent\n~\n/~";
    const output = await parseDotmark(input);
    expect(output).toContain('<div id="myId" class="myClass">');
    expect(output).toContain("Content");
    expect(output).toContain("</div>");
  });

  test("preserves non-macro content before and after macros", async () => {
    const input = "Before\n~#id.class\nInside\n/~\nAfter";
    const output = await parseDotmark(input);
    expect(output).toContain("Before");
    expect(output).toContain('<div id="id" class="class">');
    expect(output).toContain("Inside");
    expect(output).toContain("</div>");
    expect(output).toContain("After");
  });

  test("nested macros with no line breaks", async () => {
    const input =
      "~#outer.outerClass\nOuter content\n~#inner.innerClass\nInner content\n/~\n/~";
    const output = await parseDotmark(input);
    expect(output).toContain('<div id="outer" class="outerClass">');
    expect(output).toContain("Outer content");
    expect(output).toContain('<div id="inner" class="innerClass">');
    expect(output).toContain("Inner content");
    expect(output.match(/<\/div>/g)?.length).toBe(2);
  });

  test("nested macros with line breaks", async () => {
    const input =
      "~#outer.outerClass\n\nOuter content\n\n~#inner.innerClass\n\nInner content\n/~\n/~";
    const output = await parseDotmark(input);
    expect(output).toContain('<div id="outer" class="outerClass">');
    expect(output).toContain("Outer content");
    expect(output).toContain('<div id="inner" class="innerClass">');
    expect(output).toContain("Inner content");
    expect(output.match(/<\/div>/g)?.length).toBe(2);
  });
});
