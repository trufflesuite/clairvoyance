import { useEffect } from "react";
import useSWR from "swr/immutable";

import type * as Debugger from "src/debugger";

export interface UseVariablesOptions {
  session?: Debugger.Session;
}

export enum Status {
  Waiting = "waiting",
  Pending = "pending",
  Ready = "ready",
  Failed = "failed"
}

export type UseVariablesResult =
  | {
      variables: Debugger.Variables;
      status: Status.Ready;
    }
  | {
      variables?: undefined;
      status: Exclude<Status, Status.Ready>;
    };

export const useVariables = ({
  session
}: UseVariablesOptions): UseVariablesResult => {
  const { data, error, mutate } = useSWR("/variables", async () => {
    if (!session) {
      return;
    }

    await new Promise(accept => setTimeout(accept, 0));

    return await session.variables({ indicateUnknown: true });
  });

  useEffect(() => {
    if (session) {
      mutate();
    }
  }, [session, mutate]);

  const status =
    !session ? Status.Waiting
    : error ? Status.Failed
    : data ? Status.Ready
    : Status.Pending;

  if (status === Status.Ready) {
    return {
      variables: data as Debugger.Variables,
      status
    };
  }

  return { status };
};
