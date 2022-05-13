import { BaseTransaction } from "@ethereumjs/tx/dist/baseTransaction";
import { EthereumProvider } from "ganache";
import { useEffect } from "react";
import useSWR from "swr/immutable";

function makeTx(from: string, baseTx: BaseTransaction<any>): any {
  const tx = baseTx.toJSON() as any;
  tx.from = from;
  // protect against sending transactions with a too-high nonce (which will never complete)
  // or that already have a signature
  ["v", "r", "s", "nonce"].forEach((key) => {
    delete tx[key];
  });
  return tx;
}

export const useTransactionReceipt = ({provider, tx, from}: {provider: EthereumProvider | null, tx: any, from: string}) => {
  const {data, error, mutate} = useSWR("/transaction-receipt", async () => {
    if (!provider) return;
    const hash = await provider.request({method: "eth_sendTransaction", params: [makeTx(from, tx)]});
    return await provider.request({method: "eth_getTransactionReceipt", params: [hash]});
  });

  useEffect(() => {
    if (provider) {
      mutate();
    }
  }, [provider]);

  return {
    receipt: data,
    error
  }
};