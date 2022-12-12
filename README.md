# a small web application to check if a graph is red-blue colorable

The graph is red-blue colorable if two connected nodes never have the same
color, and the graph is a connected graph. A user should be able to enter
a graph in a textarea by typing some paths (a word is a node, a dash an edge
and a new line or a comma a separation between paths). Feel free to use
whichever tech stack you prefer. It should take you about a day to complete the
task.

## Some examples:

- Input: a - b - c
  Is a connected and red-blue colorable graph
- Input: a - b, f - g
  Is not a connected graph
- Input: a - b - c - a
  Is a connected graph, but not red blue colorable.
- Input: a - b, c - d, b - c, a - d
  Is a connected and red-blue colorable graph


## Assumptions

### Parsing

Input is following the pattern stated above with the following specifications:

1. A word is a alphanumeric combined characters, i.e. `[0-9a-zA-Z]+`
1. Path denoted as a dash `-`
1. Separator can either be a comma `,` or a newline
1. Space will be trimmed


### UI

1. When error throws from the input, an alert style is shown and no further inputs
are allowed or processed
1. Input is debounced to 50ms
1. No optimization is done to visualizing the graph (Adjacency List), and it is
   purely for debugging purpose

### Logic to decide if the graph is red-blue colorable

1. The adjacency list does not contain self. i.e. NO `{a:[a]}`
1. No duplicated vertex in the list. i.e. NO `{a:[v,v], v:[a,a]}`
1. The graph is undirected. i.e. `"a-b"` means `{a:[b], b:[a]}`
1. A graph with just one vertex is connected and NOT colorable because it
   only has one node

## Getting Start

1. Under the project directory, run `yarn` install the dependencies
1. To start the dev server, run `yarn dev`, then follow the instruction from the stdout
1. To run the test, run `yarn test`

## Project Structure

The project is scaffolded with `yarn create vite`.

```
 .
├──  index.html                # Generated
├──  package.json              # Dependencies
├──  public                    # Generated
│   └──  vite.svg              # Generated
├──  README.md                 # Readme file (i.e. this file)
├──  src                       # Source dir
│   ├──  App.css               # Main CSS
│   ├──  App.tsx               # Main React APP
│   ├──  assets                # Generated
│   │   └──  react.svg         # Generated
│   ├──  Checkbox.tsx          # Checkbox Component
│   ├──  Graph.tsx             # Graph Component for debug purpose
│   ├──  index.css             # Generated
│   ├──  main.tsx              # Generated
│   ├──  RedBlueColorable.tsx  # Component for getting user input, then parse then output result
│   ├──  Textarea.tsx          # Textarea Component
│   ├──  utils.test.ts         # Utils unit test
│   ├──  utils.ts              # Utils for all the logic involved for check if connected or colorable
│   └──  vite-env.d.ts         # Generated
├──  tsconfig.json             # Generated
├──  tsconfig.node.json        # Generated
├──  vite.config.ts            # Generated
└──  yarn.lock                 # Generated
```

## Dependencies

- "react": "^18.2.0",
- "react-dom": "^18.2.0"


## Dev Dependencies

- "yarn": "^1.22.19",
- "node": "^16.16",
- "@types/react": "^18.0.26",
- "@types/react-dom": "^18.0.9",
- "@vitejs/plugin-react-swc": "^3.0.0",
- "prettier": "^2.8.1",
- "typescript": "^4.9.3",
- "vite": "^4.0.0",
- "vitest": "^0.25.6"

