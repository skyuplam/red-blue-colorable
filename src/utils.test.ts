import { describe, expect, it } from "vitest";

import type { AdjacencyList, Result } from "./utils";
import { isRedBlueColorable, parse } from "./utils";

describe("isRedBlueColorable", () => {
  const cases: [AdjacencyList, Result][] = [
    [{ a: [] }, [true, true]],
    [{ a: [], b: [] }, [false, false]],
    [{ a: ["b"], b: ["a"] }, [true, true]],
    [{ a: ["b"], b: ["c"], c: [] }, [true, true]],
    [{ a: ["b"], b: [], f: ["g"], g: [] }, [false, false]],
    [{ a: ["b"], b: ["c"], c: ["a"] }, [true, false]],
    [{ a: ["b", "d"], b: ["c"], c: ["d"], d: [] }, [true, true]],
  ];
  for (const [input, expected] of cases) {
    it(`${JSON.stringify(input)} => ${expected}`, () => {
      expect(isRedBlueColorable(input)).toEqual(expected);
    });
  }
});

describe("parse", () => {
  const cases: [string, AdjacencyList][] = [
    ["", {}],
    [" ", {}],
    ["-", {}],
    ["a", { a: [] }],
    ["a-", { a: [] }],
    ["a-a", { a: [] }],
    ["a-a-a", { a: [] }],
    ["a-,a-a", { a: [] }],
    ["a-b", { a: ["b"], b: [] }],
    ["a-b,a-b", { a: ["b"], b: [] }],
    ["a-b, a-b", { a: ["b"], b: [] }],
    ["a-b,c-b", { a: ["b"], b: ["c"], c: [] }],
    ["a-b, c-b", { a: ["b"], b: ["c"], c: [] }],
    ["a-b,c-b\n\ne-f", { a: ["b"], b: ["c"], c: [], e: ["f"], f: [] }],
    ["a-b,c-b\n    \ne-f", { a: ["b"], b: ["c"], c: [], e: ["f"], f: [] }],
    [
      "a-b, c-b\n    \n\n    \ne-f, f-g",
      { a: ["b"], b: ["c"], c: [], e: ["f"], f: ["g"], g: [] },
    ],
  ];
  for (const [input, expected] of cases) {
    it(`${input} => ${expected}`, () => {
      expect(parse(input)).toEqual(expected);
    });
  }
});
