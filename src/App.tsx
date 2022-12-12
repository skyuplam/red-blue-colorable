import { useState, useEffect } from "react";

import "./App.css";
import { Textarea } from "./Textarea";
import type { AdjacencyList } from "./utils";
import { debounce, isRedBlueColorable, parse, toString } from "./utils";

function App() {
  const [inputs, setInputs] = useState<number | string | readonly string[]>("");
  const [graph, setGraph] = useState<AdjacencyList>({});
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const graph = parse(toString(inputs));
      setGraph(graph);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
    return () => setError("");
  }, [inputs]);

  const [connected, colorable] = isRedBlueColorable(graph);
  const connectedMsg = `Is ${connected ? "" : "not "}a connected graph`;
  const colorableMsg = !connected
    ? ""
    : colorable
    ? " and red-blue colorable graph"
    : ", but not red blue colorable.";
  const msgs = [connectedMsg, colorableMsg].join("");

  return (
    <div className="App">
      <h1>Red-blue colorable</h1>
      <div className="card">
        <Textarea
          value={inputs}
          maxLength={error ? 0 : undefined}
          placeholder="alphanumeric path pattern separated by comma or newline, e.g. 'a-b,b-c,c-d,d-a'"
          className="text-input"
          onChange={debounce(setInputs)}
        />
        <p
          className={["result", error ? "error" : ""].filter(Boolean).join(" ")}
        >
          {error || msgs}
        </p>
      </div>
    </div>
  );
}

export default App;
