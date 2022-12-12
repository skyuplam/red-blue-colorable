import type React from "react";
import { useState } from "react";

import { Checkbox } from "./Checkbox";
import type { AdjacencyList } from "./utils";

interface Props {
  graph: AdjacencyList;
}

export const Graph: React.FC<Props> = ({ graph }) => {
  const [debug, setDebug] = useState(false);

  return (
    <div>
      <Checkbox label="Check to debug the graph" onCheck={setDebug} />
      {debug && (
        <p className="graph">
          Debug Adjacency List:
          <br />
          {Object.entries(graph).map(([vertex, vertices]) => (
            <span className="node" key={vertex}>
              {`${vertex}: [${vertices.join(",")}]`}
              <br />
            </span>
          ))}
        </p>
      )}
    </div>
  );
};
