import { useEffect } from "react";
import useSWR from "swr/immutable";

import { selectors as $ } from "@truffle/debugger";

import type * as Debugger from "src/debugger";

import { Source } from "../types";

export interface UseOptions {
  session?: Debugger.Session;
}

export type UseResult =
  | { status: Exclude<Status, Status.Ready>; sources?: undefined; }
  | { status: Status.Ready; sources: Source[]; };

export enum Status {
  Waiting = "waiting",
  Pending = "pending",
  Ready = "ready",
  Failed = "failed"
}

export const useSources = ({
  session
}: UseOptions): UseResult => {
  const { data, error, mutate } = useSWR("/sources", async () => {
    console.debug("fetching sources");
    if (!session) {
      return;
    }

    return session.view($.sourcemapping.views.sources);
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
    const sources: Source[] = (Object.values(data) as any[])
      .flatMap(({ id, sourcePath, source: contents, language }) =>
        language === "Solidity"
          ? [{ id, sourcePath, contents, language }]
          : []
      );

    return {
      sources,
      status
    }
  }

  return { status };
};
