import React from "react";
import * as Codec from "@truffle/codec";

import type * as Debugger from "src/debugger";
import { useVariables } from "../hooks/useVariables";

const inspect = require("browser-util-inspect");

export interface VariablesProps {
  session: Debugger.Session;
}

export const Variables = ({
  session
}: VariablesProps) => {
  const { variables, status } = useVariables({ session });

  if (!variables) {
    return <p>Loading variables, status: {status}</p>;
  }

  return <dl>{
    Object.entries(variables)
      .flatMap(([identifier, result], index) => [
        <dt key={`dt-${index}`}>{
          identifier
        }</dt>,
        <dd key={`dd-${index}`}>{
          inspect(new Codec.Export.ResultInspector(result))
        }</dd>
      ])
  }</dl>;
}
