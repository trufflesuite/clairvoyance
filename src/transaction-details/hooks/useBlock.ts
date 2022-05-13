import useSWR from "swr";

export const useBlock = ({provider, blockNumber}: any) => {
  const {data} = useSWR(`/block-${blockNumber}`, async () => {
    const block = await provider.request({method: "eth_getBlockByNumber", params: [blockNumber, true]});
    return block;
  });

  return data;
};