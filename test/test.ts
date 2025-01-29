import fs from "fs/promises";
import { parseDotmark } from "../src/dotmark.ts";

const markdownPath =
  "/home/mpjovanovich/git/dotmark/test/sample_markdown/test.md";
let markdown = await fs.readFile(markdownPath, "utf8");
// markdown = await parseDotmark(markdown, false, false);
markdown = await parseDotmark(markdown, true, "material-theme");
console.log(markdown);
