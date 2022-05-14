import { useEffect } from "react";
import useSWR from "swr/immutable";

export const useBalances = ({receipt, provider, block}: any) => {
  const {data, mutate} = useSWR(`/balances`, async () => {
    if(!receipt || !provider || !block) return;
    const fromStartBalance = await provider.request({method: "eth_getBalance", params: [receipt.from, block.number]});
    const fromEndBalance = await provider.request({method: "eth_getBalance", params: [receipt.from, receipt.blockNumber]});
    let toStartBalance, toEndBalance;
    if(receipt.to) {
      toStartBalance = await provider.request({method: "eth_getBalance", params: [receipt.to, block.number]});
      toEndBalance = await provider.request({method: "eth_getBalance", params: [receipt.to, receipt.blockNumber]});
    } 
    else if(receipt.contractAddress) {
      toStartBalance = await provider.request({method: "eth_getBalance", params: [receipt.contractAddress, block.number]});
      toEndBalance = await provider.request({method: "eth_getBalance", params: [receipt.contractAddress, receipt.blockNumber]});
    }
    return {
      fromStartBalance,
      fromEndBalance,
      toStartBalance,
      toEndBalance
    };
  });
  
  useEffect(() => {
    if (receipt || provider || block) {
      mutate();
    }
  }, [receipt, provider, block]);

  return data;
};