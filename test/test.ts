import fs from "fs/promises";
// import hljs from "highlightjs";
import { Marked } from "marked";
// import { markedHighlight } from "marked-highlight";

const PRETTYMARK_TOKEN = "PRETTYMARK_DIV";

// Create a pretty-mark commented div with the id and classes that were passed in.
const createPrettyMarkDiv = (id?: string, classes: string[] = []): string => {
  const idAttr = id ? ` id="${id}"` : "";
  const classAttr = classes.length > 0 ? ` class="${classes.join(" ")}"` : "";
  return `<!--${PRETTYMARK_TOKEN}<div${idAttr}${classAttr}>${PRETTYMARK_TOKEN}-->`;
};

// Remove comments from pretty-mark divs from the markdown.
const removePrettyMarkTokens = (markdown: string): string => {
  return markdown
    .replace(new RegExp(`<!--${PRETTYMARK_TOKEN}`, "g"), "")
    .replace(new RegExp(`${PRETTYMARK_TOKEN}-->`, "g"), "");
};

// Check if the line is the start of a pretty-mark macro.
const isMacroStart = (line: string): boolean => {
  // We expect the line to be trimmed.
  return line.startsWith("~") && (line[1] === "#" || line[1] === ".");
};

// Check if the line is the end of a pretty-mark macro.
const isMacroEnd = (line: string): boolean => {
  return line === "/~";
};

// Parse the start of a pretty-mark macro to get the id and classes.
const parseMacro = (line: string): { id?: string; classes: string[] } => {
  // Remove the leading ~
  const trimmed = line.slice(1);
  let id: string | undefined = undefined;
  const classes: string[] = [];

  // There may be zero to one id
  // Id must be at the beginning of the line if present
  const idMatch = trimmed.match(/^#([^#.]+)/);
  if (idMatch) {
    id = idMatch[1];
  }

  // There may be zero to many classes
  const classMatch = trimmed.match(/\.([^#.]+)/g);
  if (classMatch) {
    classes.push(...classMatch.map((c) => c.slice(1)));
  }

  return { id, classes };
};

/* ******************************************************
 * READ MARKDOWN FILE
 ********************************************************/
const markdownPath =
  "/home/mpjovanovich/git/pretty-mark/test/sample_markdown/test.md";
let markdown = await fs.readFile(markdownPath, "utf8");

/* ******************************************************
 * EMBED TOKENS
 ********************************************************/
let parsedMarkdown = markdown
  .split("\n")
  .map((line) => {
    const trimmedLine = line.trim();
    if (isMacroStart(trimmedLine)) {
      const { id, classes } = parseMacro(trimmedLine);
      return createPrettyMarkDiv(id, classes);
    } else if (isMacroEnd(trimmedLine)) {
      return `<!--${PRETTYMARK_TOKEN}</div>${PRETTYMARK_TOKEN}-->`;
    }
    return line;
  })
  .join("\n");

/* ******************************************************
 * PARSE MARKDOWN
 ********************************************************/
let marked = new Marked();
markdown = await marked.parse(parsedMarkdown);

/* ******************************************************
 * REMOVE TOKENS
 ********************************************************/
markdown = removePrettyMarkTokens(markdown);

// Output the markdown.
console.log(markdown);
