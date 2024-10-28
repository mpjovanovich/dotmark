import { parseMacro } from "../src/dotmark";

describe("parseMacro", () => {
  test("parses single id macro", () => {
    const result = parseMacro("~#myId");
    expect(result).toEqual({ id: "myId", classes: [] });
  });

  test("parses single class macro", () => {
    const result = parseMacro("~.myClass");
    expect(result).toEqual({ id: undefined, classes: ["myClass"] });
  });

  test("parses multiple classes macro", () => {
    const result = parseMacro("~.class1.class2.class3");
    expect(result).toEqual({
      id: undefined,
      classes: ["class1", "class2", "class3"],
    });
  });

  test("parses id and single class macro", () => {
    const result = parseMacro("~#myId.myClass");
    expect(result).toEqual({ id: "myId", classes: ["myClass"] });
  });

  test("parses id and multiple classes macro", () => {
    const result = parseMacro("~#myId.class1.class2.class3");
    expect(result).toEqual({
      id: "myId",
      classes: ["class1", "class2", "class3"],
    });
  });

  test("handles empty input", () => {
    const result = parseMacro("~");
    expect(result).toEqual({ id: undefined, classes: [] });
  });

  test("ignores non-alphanumeric characters in id", () => {
    const result = parseMacro("~#my-id-with-hyphens");
    expect(result).toEqual({ id: "my-id-with-hyphens", classes: [] });
  });

  test("ignores non-alphanumeric characters in classes", () => {
    const result = parseMacro("~.my-class.another_class");
    expect(result).toEqual({
      id: undefined,
      classes: ["my-class", "another_class"],
    });
  });
});
