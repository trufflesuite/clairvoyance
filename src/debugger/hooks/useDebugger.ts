import { useEffect, useState } from "react";
import type { EthereumProvider } from "ganache";

import * as Codec from "@truffle/codec";
import * as TruffleDebugger from "@truffle/debugger";

import type { Session, FetchCompilations } from "../types";

export interface UseDebuggerOptions {
  transactionHash: string;
  provider: EthereumProvider;
  fetchCompilations: FetchCompilations;
}

export enum Status {
  Initializing = "initializing",
  Fetching = "fetching",
  Starting = "starting",
  Ready = "ready"
}

export type UseDebuggerResult =
  | {
      session: Session;
      status: Status.Ready;
      fetchProgress?: undefined;
    }
  | {
      session?: undefined;
      status: Status.Fetching;
      fetchProgress: number;
    }
  | {
      session?: undefined;
      status: Exclude<Status, Status.Ready | Status.Fetching>;
      fetchProgress?: undefined;
    };

export const useDebugger = ({
  transactionHash,
  provider,
  fetchCompilations
}: UseDebuggerOptions): UseDebuggerResult => {
  const [session, setSession] = useState<Session | undefined>();
  const [status, setStatus] = useState<Status>(
    Status.Initializing
  );
  const [fetchProgress, setFetchProgress] = useState<number>(0);

  useEffect(() => {
    if (session) {
      return;
    }

    Promise.resolve().then(async () => {
      setStatus(Status.Initializing);

      const session = await initializeDebugger({ transactionHash, provider });
      setSession(session);
      setStatus(Status.Fetching);

      await fetchExternalForDebugger({
        session,
        fetchCompilations,
        setFetchProgress
      });
      setStatus(Status.Starting);

      await session.startFullMode();
      setStatus(Status.Ready);
    });
  }, [session, provider, transactionHash, fetchCompilations]);

  switch (status) {
    case Status.Ready: {
      if (!session) {
        throw new Error("Internal error: expected session to be defined");
      }

      return {
        status,
        session
      };
    }
    case Status.Fetching: {
      return {
        status,
        fetchProgress
      };
    }
    default: {
      return {
        status
      };
    }
  }
}

interface InitializeDebuggerOptions {
  transactionHash: string;
  provider: EthereumProvider;
}

async function initializeDebugger({
  transactionHash,
  provider
}: InitializeDebuggerOptions): Promise<Session> {
  return await TruffleDebugger.forTx(transactionHash, {
    provider,
    compilations: [],
    lightMode: true
  });
}

interface FetchExternalForDebuggerOptions {
  session: Session;
  fetchCompilations: FetchCompilations;
  setFetchProgress: (modify: (progress: number) => number) => void;
}

async function fetchExternalForDebugger({
  session,
  fetchCompilations,
  setFetchProgress
}: FetchExternalForDebuggerOptions): Promise<void> {
  const $ = session.selectors;

  const instances: any = session.view($.session.info.affectedInstances);
  const addresses: string[] = Object.entries(instances)
    .filter(([_, { contractName }]: any) => contractName === undefined)
    .map(([address, _]) => address);

  for (const [index,address] of addresses.entries()) {
    const compilations = await fetchCompilations(address);
    const shimmedCompilations = Codec.Compilations.Utils.shimCompilations(
      compilations,
      `externalFor(${address})Via(Etherscan)`
    );
    console.debug("shimmedCompilations %o", shimmedCompilations);

    await session.addExternalCompilations(shimmedCompilations);

    setFetchProgress(
      progress => Math.max(
        progress,
        100 * (index + 1) / addresses.length
      )
    );
  }
}
