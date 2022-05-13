import React from "react";
import * as Chakra from "@chakra-ui/react";
import type { EthereumProvider } from "ganache";

import type { FetchCompilations } from "../types";
import { useDebugger, Status } from "../hooks/useDebugger";

import { Sources } from "src/sources";
import Controls from "./Controls";

export interface Props {
  provider: EthereumProvider;
  transactionHash: string;
  fetchCompilations: FetchCompilations;
}

const Debugger = ({
  provider,
  transactionHash,
  fetchCompilations
}: Props) => {
  const { session, status } = useDebugger({
    provider,
    transactionHash,
    fetchCompilations
  });

  if (status !== Status.Ready) {
    return <p>Loading debugger...</p>;
  }

  return <Chakra.Box width="100%" height="100%">
    <Controls session={session} />
    <Sources session={session} />
  </Chakra.Box>
}

export default Debugger;