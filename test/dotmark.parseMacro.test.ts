import { expect, describe, test } from "vitest";
import { parseMacro } from "../src/dotmark";

describe("parseMacro", () => {
  test("handles empty input", () => {
    expect(parseMacro("")).toEqual({
      id: undefined,
      classes: [],
    });
  });

  test("parses single id", () => {
    expect(parseMacro("~#myId")).toEqual({
      id: "myId",
      classes: [],
    });
  });

  test("parses single class", () => {
    expect(parseMacro("~.myClass")).toEqual({
      id: undefined,
      classes: ["myClass"],
    });
  });

  test("parses multiple classes", () => {
    expect(parseMacro("~.class1.class2")).toEqual({
      id: undefined,
      classes: ["class1", "class2"],
    });
  });

  test("parses id with classes", () => {
    expect(parseMacro("~#myId.myClass")).toEqual({
      id: "myId",
      classes: ["myClass"],
    });
  });

  test("handles malformed id without crashing", () => {
    expect(parseMacro("~#")).toEqual({
      id: undefined,
      classes: [],
    });
  });

  test("handles malformed class without crashing", () => {
    expect(parseMacro("~.")).toEqual({
      id: undefined,
      classes: [],
    });
  });

  test("ignores non-alphanumeric characters in id", () => {
    expect(parseMacro("~#my-id-with-hyphens")).toEqual({
      id: "my-id-with-hyphens",
      classes: [],
    });
  });

  test("ignores non-alphanumeric characters in classes", () => {
    expect(parseMacro("~.class-with-hyphens")).toEqual({
      id: undefined,
      classes: ["class-with-hyphens"],
    });
  });
});
