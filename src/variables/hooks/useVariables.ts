import { useEffect } from "react";
import useSWR from "swr/immutable";

import type * as Debugger from "src/debugger";

export interface UseVariablesOptions {
  session?: Debugger.Session;
}

export enum VariablesStatus {
  Waiting = "waiting",
  Pending = "pending",
  Ready = "ready",
  Failed = "failed"
}

export type UseVariablesResult =
  | {
      variables: Debugger.Variables;
      status: VariablesStatus.Ready;
    }
  | {
      variables?: undefined;
      status: Exclude<VariablesStatus, VariablesStatus.Ready>;
    };

export const useVariables = ({
  session
}: UseVariablesOptions): UseVariablesResult => {
  const { data, error, mutate } = useSWR("/variables", async () => {
    if (!session) {
      return;
    }

    return await session.variables({ indicateUnknown: true });
  });

  useEffect(() => {
    if (session) {
      mutate();
    }
  }, [session, mutate]);

  const status = !session
    ? VariablesStatus.Waiting
    : !!data
      ? VariablesStatus.Ready
      : !!error
        ? VariablesStatus.Failed
        : VariablesStatus.Pending;

  if (status === VariablesStatus.Ready) {
    return {
      variables: data as Debugger.Variables,
      status
    };
  }

  return { status };
};
