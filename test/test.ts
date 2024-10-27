import fs from "fs/promises";
import { prettyMark } from "../src/prettyMark.ts";

const markdownPath =
  "/home/mpjovanovich/git/pretty-mark/test/sample_markdown/test.md";
let markdown = await fs.readFile(markdownPath, "utf8");
markdown = await prettyMark(markdown, false, false);
// markdown = await prettyMark(markdown, true, true);
console.log(markdown);
