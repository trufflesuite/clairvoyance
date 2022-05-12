import { useEffect } from "react";
import useSWR from "swr";

import { selectors as $ } from "@truffle/debugger";

import type * as Debugger from "src/debugger";
import type { SourceRange } from "../types";

export interface UseOptions {
  session?: Debugger.Session;
}

export type UseResult =
  | { status: Exclude<Status, Status.Ready>; currentSourceRange?: undefined }
  | { status: Status.Ready; currentSourceRange: SourceRange };

export enum Status {
  Waiting = "waiting",
  Pending = "pending",
  Ready = "ready",
  Failed = "failed"
}

export const useCurrentSourceRange = ({
  session
}: UseOptions): UseResult => {
  const { data, error, mutate } = useSWR("/currentSourceRange", async () => {
    if (!session) {
      return;
    }

    const traceIndex = session.view(
      $.trace.index
    );

    const { id } = session.view(
      $.sourcemapping.current.source
    )

    const {
      lines: { start, end }
    } = session.view(
      $.sourcemapping.current.sourceRange
    );

    return {
      traceIndex,
      source: { id },
      start,
      end
    };
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
      currentSourceRange: data as SourceRange,
      status
    }
  }

  return { status };
};
