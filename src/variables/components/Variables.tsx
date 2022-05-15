import React from "react";
import * as Chakra from "@chakra-ui/react";

import * as Codec from "@truffle/codec";

import type * as Debugger from "src/debugger";
import { Result } from "src/decoding/Result";
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

  return <Chakra.Box>
    <Chakra.Heading>Variables</Chakra.Heading>
    <Chakra.TableContainer>
      <Chakra.Table variant="simple">
        <Chakra.Thead>
          <Chakra.Tr>
            <Chakra.Th>Identifier</Chakra.Th>
            <Chakra.Th>Value</Chakra.Th>
          </Chakra.Tr>
        </Chakra.Thead>
        <Chakra.Tbody>{
          Object.entries(variables)
            .map(([identifier, result], index) => {
              console.debug("%s: %o", identifier, result);
              return <Chakra.Tr key={identifier}>
                <Chakra.Td>{identifier}</Chakra.Td>
                <Chakra.Td>
                  <Result result={result} />
                </Chakra.Td>
              </Chakra.Tr>
            })
        }</Chakra.Tbody>
      </Chakra.Table>
    </Chakra.TableContainer>
  </Chakra.Box>;
}
