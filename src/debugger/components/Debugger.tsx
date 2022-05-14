import React from "react";
import * as Chakra from "@chakra-ui/react";
import type { EthereumProvider } from "ganache";

import type { FetchCompilations } from "../types";
import { useDebugger, Status } from "../hooks/useDebugger";

import { Sources } from "src/sources";
import { Variables } from "src/variables";
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
  const { session, status, fetchProgress } = useDebugger({
    provider,
    transactionHash,
    fetchCompilations
  });

  switch (status) {
    case Status.Initializing: {
      return <Chakra.Box>
        <Chakra.Heading>
          <Chakra.Spinner />
          <Chakra.Text>Preparing to start debugger...</Chakra.Text>
        </Chakra.Heading>
        <Chakra.Stack>
          <Chakra.Skeleton height="20px" />
          <Chakra.Skeleton height="20px" />
          <Chakra.Skeleton height="20px" />
        </Chakra.Stack>
      </Chakra.Box>;
    }
    case Status.Fetching: {
      return <Chakra.Box>
        <Chakra.Heading>
          <Chakra.CircularProgress value={fetchProgress} />
          <Chakra.Text>Fetching verified sources...</Chakra.Text>
        </Chakra.Heading>
        <Chakra.Stack>
          <Chakra.Skeleton height="20px" />
          <Chakra.Skeleton height="20px" />
          <Chakra.Skeleton height="20px" />
        </Chakra.Stack>
      </Chakra.Box>;
    }
    case Status.Starting: {
      return <Chakra.Box>
        <Chakra.Heading>
          <Chakra.Spinner />
          <Chakra.Text>Starting debugger...</Chakra.Text>
        </Chakra.Heading>
        <Chakra.Stack>
          <Chakra.Skeleton height="20px" />
          <Chakra.Skeleton height="20px" />
          <Chakra.Skeleton height="20px" />
        </Chakra.Stack>
      </Chakra.Box>;
    }
    case Status.Ready: {
      return <Chakra.Box width="100%">
        <Chakra.Flex>
          <Chakra.Box width="70%">
            <Controls session={session} />
            <Sources session={session} />
          </Chakra.Box>
          <Chakra.Spacer />
          <Chakra.Box width="30%" marginTop="6rem" >
            <Variables session={session} />
          </Chakra.Box>
        </Chakra.Flex>
      </Chakra.Box>;
    }
  }
}

export default Debugger;
