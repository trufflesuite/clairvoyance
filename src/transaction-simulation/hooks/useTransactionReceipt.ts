import { EthereumProvider } from "ganache";
import { useEffect } from "react";
import useSWR from "swr/immutable";


export const useTransactionReceipt = ({provider, transaction}: {provider: EthereumProvider | null, transaction: any}) => {
  const {data, error, mutate} = useSWR("/transaction-receipt", async () => {
    if (!provider) return;
    const hash = await provider.request({method: "eth_sendTransaction", params: [transaction]});
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