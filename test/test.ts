import fs from "fs/promises";
import { parseDotmark } from "../src/dotmark.ts";

const markdownPath =
  "/home/mpjovanovich/git/dotmark/test/sample_markdown/test.md";
const outputPath = "/mnt/c/Users/mpjov/Desktop/test.html";
let markdown = await fs.readFile(markdownPath, "utf8");
markdown = await parseDotmark(markdown);
// console.log(markdown);
await fs.writeFile(outputPath, markdown);
