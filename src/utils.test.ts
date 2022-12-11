import { describe, expect, it } from "vitest";

import type { AdjacencyList, Result } from "./utils";
import { isRedBlueColorable, parse } from "./utils";

describe("isRedBlueColorable", () => {
  const cases: [AdjacencyList, Result][] = [
    [{}, [false, false]],
    [{ a: [] }, [true, false]],
    [{ a: [], b: [] }, [false, false]],
    [{ a: ["b"], b: ["a"] }, [true, true]],
    [{ a: ["e"], e: ["g", "a"], g: ["e"] }, [true, true]],
    [{ a: ["b"], b: ["c"], c: [] }, [true, true]],
    [{ a: ["b"], b: [], f: ["g"], g: [] }, [false, false]],
    [{ a: ["b"], b: ["c"], c: ["a"] }, [true, false]],
    [{ a: ["b", "d"], b: ["c"], c: ["d"], d: [] }, [true, true]],
    [{ a: ["b", "c"], b: ["a"], c: ["a", "d"], d: ["c"] }, [true, true]],
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
    ["a-b", { a: ["b"], b: ["a"] }],
    ["a-b,a-b", { a: ["b"], b: ["a"] }],
    ["a-b, a-b", { a: ["b"], b: ["a"] }],
    ["a-b,c-b", { a: ["b"], b: ["a", "c"], c: ["b"] }],
    ["a-b, c-b", { a: ["b"], b: ["a", "c"], c: ["b"] }],
    [
      "a-b,c-b\n\ne-f",
      { a: ["b"], b: ["a", "c"], c: ["b"], e: ["f"], f: ["e"] },
    ],
    [
      "a-b,c-b\n    \ne-f",
      { a: ["b"], b: ["a", "c"], c: ["b"], e: ["f"], f: ["e"] },
    ],
    [
      "a-b, c-b\n    \n\n    \ne-f, f-g",
      { a: ["b"], b: ["a", "c"], c: ["b"], e: ["f"], f: ["e", "g"], g: ["f"] },
    ],
    ["e-g,e-a", { a: ["e"], e: ["g", "a"], g: ["e"] }],
  ];
  for (const [input, expected] of cases) {
    it(`${input} => ${JSON.stringify(expected)}`, () => {
      expect(parse(input)).toEqual(expected);
    });
  }
});
