import type * as Codec from "@truffle/codec";
import type * as Common from "@truffle/compile-common";

export type Selector = any;

export type FetchCompilations =
  (address: string) => Promise<Common.Compilation[]>;

export interface Session {
  selectors: any;

  addExternalCompilations(
    compilations: Codec.Compilations.Compilation[]
  ): Promise<void>;

  startFullMode(): Promise<void>;

  view(selector: Selector): any;

  variables(options?: {
    indicateUnknown?: boolean
  }): Promise<Variables>;

  continueUntilBreakpoint(): Promise<void>;
  stepNext(): Promise<void>;
  reset(): Promise<void>;
}

export interface Variables {
  [identifier: string]: Codec.Format.Values.Result;
}
