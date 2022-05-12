import type { BaseTransaction } from "@ethereumjs/tx/dist/baseTransaction";

export type OpCode = {
  name: string;
  fee: number;
}

export type Options = {tx: BaseTransaction<any>, options: any, chainId: number, networkId: number, from: string, to: string}