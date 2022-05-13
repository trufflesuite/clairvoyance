import type * as Codec from "@truffle/codec";

export type Selector = any;

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
