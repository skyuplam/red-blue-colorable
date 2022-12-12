import type React from "react";
import { useState, useEffect } from "react";

import { Textarea } from "./Textarea";
import { debounce, isRedBlueColorable, parse, toString } from "./utils";
import type { AdjacencyList } from "./utils";

interface Props {
  setGraph: (graph: AdjacencyList) => void;
  graph: AdjacencyList;
}

export const RedBlueColorable: React.FC<Props> = ({ graph, setGraph }) => {
  const [inputs, setInputs] = useState<number | string | readonly string[]>("");
  const [error, setError] = useState("");

  const [connected, colorable] = isRedBlueColorable(graph);
  const connectedMsg = `Input is ${connected ? "" : "not "}a connected graph`;
  const colorableMsg = !connected
    ? ""
    : colorable
    ? " and red-blue colorable graph"
    : ", but not red blue colorable.";
  const msgs = [connectedMsg, colorableMsg].join("");

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

  return (
    <div>
      <p className={["result", error ? "error" : ""].filter(Boolean).join(" ")}>
        {error || msgs}
      </p>
      <Textarea
        value={inputs}
        label="Input some paths to know if provided is a red-blue colorable."
        maxLength={error ? 0 : undefined}
        placeholder="alphanumeric path pattern separated by comma or newline, e.g. 'a-b,b-c,c-d,d-a'"
        className={["text-input", error && "invalid"].filter(Boolean).join(" ")}
        onChange={debounce(setInputs)}
      />
    </div>
  );
};
