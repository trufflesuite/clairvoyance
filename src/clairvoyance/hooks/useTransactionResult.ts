import { useEffect } from "react";
import useSWR from "swr/immutable";

export const useTransactionResult = ({provider, block, transaction}: any) => {
  const {data, mutate} = useSWR(`/transaction-result`, async () => {
    if(!provider || !block) return;
    let callResult = "";
    try{
      callResult = await provider.request({method: "eth_call", params: [transaction, block.number]});
    } catch(e: any) {
      callResult = e.message;
    }
    return callResult;
    
  });

  useEffect(() => {
    if (provider || block) {
      mutate();
    }
  }, [provider, block]);

  return { callResult: data };
};