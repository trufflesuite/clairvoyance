import { useEffect } from "react";
import useSWR from "swr/immutable";

export const useTransactionResult = ({provider, block, transaction, transactionDecoding, decoder}: any) => {
  const {data, mutate} = useSWR(`/transaction-result`, async () => {
    if(!provider || !block || !decoder) return;
    let rawResult = "";
    try{
      rawResult = await provider.request({method: "eth_call", params: [transaction, block.number]});
    } catch(e: any) {
      rawResult = e.message;
    }
    const contractInstanceDecoder = await decoder.forAddress(transaction.to);
    const [decodedResult] = await contractInstanceDecoder.decodeReturnValue(transactionDecoding.abi, rawResult, {block: block.number});
    return {decoding: decodedResult, rawResult};
    
  });

  useEffect(() => {
    if (provider && block && decoder) {
      mutate();
    }
  }, [provider, block, decoder, mutate]);

  return { returnValueDecoding: data?.decoding, rawReturnValue: data?.rawResult };
};