import { cleanInput } from "./repl";
import { describe, expect, test } from "vitest";

describe.each([
  {
    input: "  hello  world  ",
    expected: ["hello", "world"],
  },
  {
    input: "foo    bar baz",
    expected: ["foo", "bar", "baz"],
  },
  {
    input: "   singleWord   ",
    expected: ["singleWord"],
  },
  {
    input: "      ",
    expected: [],
  },
  {
    input: "",
    expected: [],
  },
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    const actual = cleanInput(input);
    expect(actual).toHaveLength(expected.length);
    for (const i in expected) {
      expect(actual[i]).toBe(expected[i]);
    }
  });
});
