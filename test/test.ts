import fs from "fs/promises";
// import hljs from "highlightjs";
import { Marked } from "marked";
// import { markedHighlight } from "marked-highlight";

const PRETTYMARK_PREFIX = "__PRETTYMARK_DIV__";

// When creating the div:
const createMdDiv = (id?: string, classes: string[] = []): string => {
  const idAttr = id ? ` id="${id}"` : "";
  const classAttr = classes.length > 0 ? ` class="${classes.join(" ")}"` : "";
  return `<${PRETTYMARK_PREFIX}${idAttr}${classAttr}>`;
};

// // When closing the div:
// const closeMdDiv = (): string => {
//   return `</${PRETTYMARK_PREFIX}>`;
// };

// // After markdown processing, replace the custom tags:
// const finalizeContent = (content: string): string => {
//   return content
//     .replace(new RegExp(`<${PRETTYMARK_PREFIX}`, 'g'), '<div')
//     .replace(new RegExp(`</${PRETTYMARK_PREFIX}>`, 'g'), '</div>');

const isMacroStart = (line: string): boolean => {
  // We expect the line to be trimmed.
  return line.startsWith("~") && (line[1] === "#" || line[1] === ".");
};

const isMacroEnd = (line: string): boolean => {
  return line === "/~";
};

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

const markdownPath =
  "/home/mpjovanovich/git/pretty-mark/test/sample_markdown/test.md";

let markdown = await fs.readFile(markdownPath, "utf8");

/* ******************************************************
 * ESCAPE MACROS
 ********************************************************/
let parsedMarkdown = markdown.split("\n").map((line) => {
  const trimmedLine = line.trim();
  if (isMacroStart(trimmedLine)) {
    const { id, classes } = parseMacro(trimmedLine);
    return createMdDiv(id, classes);
  } else if (isMacroEnd(trimmedLine)) {
    return `</${PRETTYMARK_PREFIX}>`;
  }
  return line;
});

console.log(parsedMarkdown.join("\n"));
