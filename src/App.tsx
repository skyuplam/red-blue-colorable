import { useState, useEffect } from "react";

import "./App.css";
import { Graph } from "./Graph";
import { RedBlueColorable } from "./RedBlueColorable";
import { isRedBlueColorable, debounce } from "./utils";
import type { AdjacencyList } from "./utils";

function App() {
  const [graph, setGraph] = useState<AdjacencyList>({});

  return (
    <div className="App">
      <h1>Red-blue colorable</h1>
      <div className="card">
        <RedBlueColorable graph={graph} setGraph={debounce(setGraph, 500)} />
        <Graph graph={graph} />
      </div>
    </div>
  );
}

export default App;
