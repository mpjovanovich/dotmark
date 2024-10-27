import fs from "fs";

const markdownPath =
  "/home/mpjovanovich/git/pretty-mark/test/sample_markdown/test.md";

const markdown = fs.readFileSync(markdownPath, "utf8");

console.log(markdown);

// console.log("Hello, world!");
