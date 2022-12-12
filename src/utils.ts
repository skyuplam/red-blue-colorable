type Fn<T> = (...args: T[]) => void;
type Debound = <T>(fn: Fn<T>, delay?: number) => (...args: T[]) => void;

export const debounce: Debound = (fn, delay = 50) => {
  let timeoutId = -1;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => fn.apply(undefined, args), delay);
  };
};

type Colorable = boolean;
type Connected = boolean;
export enum Color {
  None = -1,
  Red = 0,
  Blue = 1,
}
export type Result = [Connected, Colorable];
export type AdjacencyList = Record<string, string[]>;

type ColoredTable = Record<string, Color>;

/**
 * A function to check if the provided AdjacencyList is connected and colorable.
 * Assuming:
 * 1. The adjacency list does not contain self. i.e. NO `{a:[a]}`
 * 2. No duplicated vertex in the list. i.e. NO `{a:[v,v], v:[a,a]}`
 * 3. The graph is undirected. i.e. `"a-b"` means `{a:[b], b:[a]}`
 * 4. A graph with just one vertex is connected and NOT colorable because it
 *    only has one node
 *
 * @param graph - An AdjacencyList to form the relation
 */
export const isRedBlueColorable = (graph: AdjacencyList): Result => {
  const vertices = Object.keys(graph);
  if (vertices.length === 0) {
    return [false, false];
  }
  if (vertices.length === 1 && graph[vertices[0]].length === 0) {
    // A graph with just one vertex is connected and NOT colorable(?)
    return [true, false];
  }
  const coloredVertexMap = vertices.reduce<ColoredTable>(
    (acc, key) => ({ ...acc, [key]: Color.None }),
    {}
  );

  /**
   * Alternate color by accepting a current color and return a new color
   *
   * @param color - The current color
   */
  const nextColor = (color: Color) =>
    color === Color.Red ? Color.Blue : Color.Red;

  /**
   * Depth first search to visit the Graph
   * @param vertex - Vertex to be searched and colored
   * @param color - Color to be applied to the provided vertex
   */
  const dfs = (vertex: string, color: Color): boolean => {
    const vertexIndex = vertices.indexOf(vertex);
    // Vertex has already been visited
    if (vertexIndex === -1) {
      return coloredVertexMap[vertex] === color;
    }
    // Visit vertex
    vertices.splice(vertexIndex, 1);
    if (
      coloredVertexMap[vertex] === Color.None ||
      coloredVertexMap[vertex] === color
    ) {
      coloredVertexMap[vertex] = color;
      for (const adjacentVertex of graph[vertex]) {
        const colorable = dfs(adjacentVertex, nextColor(color));
        // Stop when color conflict found, terminate immediately
        if (!colorable) {
          return colorable;
        }
      }
    } else {
      return false;
    }
    return true;
  };

  const [vertex] = vertices;
  const colorable = dfs(vertex, Color.Red);
  const connected = vertices.length === 0;

  return [connected, connected && colorable];
};

/**
 * Convert number or string[] to string
 *
 * @param input - An input to be converted
 *
 */
export const toString = (input: number | string | readonly string[]) => {
  if (typeof input === "number") {
    return String(input);
  }
  if (input instanceof Array) {
    return input.join("\n");
  }
  return input;
};

export const isAlphaNumeric = (input: string): boolean => {
  for (const c of input) {
    if (
      !(c >= "0" && c <= "9") &&
      !(c >= "a" && c <= "z") &&
      !(c >= "A" && c <= "Z")
    ) {
      return false;
    }
  }
  return Boolean(input.length);
};

/**
 * Input parser to parse input string with pattern of path string
 * (e.g. "a-b") and newline ("\n") or comma (",") are treated as a separator
 * between paths for creating an adjacency list for an undirected graph
 *
 * @param input - Input string
 */
export const parse = (input: string): AdjacencyList =>
  input
    .split("\n")
    .flatMap((line) => {
      const trimmed = line.trim();
      if (!trimmed) {
        return [];
      }
      return trimmed.split(",");
    }) // Remove empty line
    .reduce<AdjacencyList>((graph, pair) => {
      if (pair) {
        pair
          .split("-")
          .flatMap((s) => {
            const trimmed = s.trim();
            if (!trimmed) {
              return [];
            }
            return [trimmed];
          })
          .forEach((vertex, index, vertices) => {
            if (!isAlphaNumeric(vertex)) {
              throw new Error(
                "Invalid input, only accepting alphanumeric combination as a word"
              );
            }
            if (!graph[vertex]) {
              graph[vertex] = [];
            }
            if (index > 0) {
              // No duplicated
              if (
                !graph[vertices[index - 1]].includes(vertex) &&
                vertices[index - 1] !== vertex
              ) {
                graph[vertices[index - 1]].push(vertex);
                graph[vertex].push(vertices[index - 1]);
              }
            }
          });
      }
      return graph;
    }, {});
