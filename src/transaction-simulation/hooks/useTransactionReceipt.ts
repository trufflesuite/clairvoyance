import { BaseTransaction } from "@ethereumjs/tx/dist/baseTransaction";
import useSWR from "swr/immutable";

function makeTx(from: string, baseTx: BaseTransaction<any>): any {
  const tx = baseTx.toJSON() as any;
  tx.from = from;
  // protect against sending transactions with a too-high nonce (which will never complete)
  delete (tx as any).nonce;
  return tx;
}

export const useTransactionReceipt = ({provider, tx, from}: any) => {
  const {data, error} = useSWR("/transaction-receipt", async () => {
    const hash = await provider.request({method: "eth_sendTransaction", params: [makeTx(from, tx)]});
    return await provider.request({method: "eth_getTransactionReceipt", params: [hash]});
  });

  return {
    receipt: data,
    error
  }
};