import type { NextPage } from 'next'
import Head from 'next/head'
import * as Chakra from "@chakra-ui/react";
import { useRouter } from 'next/router'
import { useProvider } from "src/web3/hooks/useProvider";
import { useDebugger } from "src/debugger";
import { Debugger } from "src/debugger";
import axios from "axios";

const Debug: NextPage = () => {
  const router = useRouter();
  const provider = useProvider({ url: "http://erigon.dappnode:8545" });
  // convex
  const transactionHash = "0x53e092e6f25e540d6323af851a1e889276096d58ec25495aef4500467ef2753c";

  const fetchCompilations = async (address: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/address?address=${address}&network-id=1`
      );
      const {
        data: {
          compileResult: { compilations }
        }
      } = response;

      return compilations;
    } catch {
      return [];
    }
  }

  return <Chakra.Box
    width="100vw"
    height="70vh"
  >
    <Debugger
      provider={provider}
      transactionHash={transactionHash}
      fetchCompilations={fetchCompilations}
    />
  </Chakra.Box>;
}
export default Debug;
