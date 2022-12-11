import { useState } from "react";

import "./App.css";
import { Textarea } from "./Textarea";
import { debounce, isRedBlueColorable, parse, toString } from "./utils";

function App() {
  const [inputs, setInputs] = useState<number | string | readonly string[]>("");
  const [connected, colorable] = isRedBlueColorable(parse(toString(inputs)));
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
          placeholder="e.g. 'a-b,b-c,c-d,d-a'"
          className="text-input"
          onChange={debounce(setInputs)}
        />
        <p className="result">{msgs}</p>
      </div>
    </div>
  );
}

export default App;
