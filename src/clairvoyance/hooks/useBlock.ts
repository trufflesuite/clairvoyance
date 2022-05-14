import { useEffect } from "react";
import useSWR from "swr/immutable";

export const useBlock = ({provider, blockNumber}: any) => {
  const {data, mutate} = useSWR(`/block-${blockNumber}`, async () => {
    if(!provider) return
    const block = await provider.request({method: "eth_getBlockByNumber", params: [blockNumber, true]});
    return block;
  });
  
  useEffect(() => {
    if (provider) {
      mutate();
    }
  }, [provider]);

  return { block: data };
};