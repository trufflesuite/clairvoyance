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
  const {data} = useSWR("/transaction-receipt", async () => {
    const blockSub = await provider.request({method: "eth_subscribe", params: ["newHeads"]});
    const blockProm = new Promise<void>(resolve => {
      function handleMessage (event: any) {
        if (event.type === "eth_subscription" && event.data.subscription === blockSub) {
          resolve();
          unsub();
        }
      }
      const unsub = provider.on("message", handleMessage);
    });
    
    const forkBlockNumber = `0x${provider.getOptions().fork.blockNumber.toString(16)}`;
    await provider.request({method: "miner_stop", params: []});
    const {timestamp} = await provider.request({method: "eth_getBlockByNumber", params: [forkBlockNumber, false]});
    const hash = await provider.request({method: "eth_sendTransaction", params: [makeTx(from, tx)]});
    // mine the transaction 15 seconds after the fork
    await provider.request({method: "evm_mine", params: [parseInt(timestamp, 16) + 15]});
    await blockProm;
    const receipt = await provider.request({method: "eth_getTransactionReceipt", params: [hash]});
    
    // clean up
    await provider.request({method: "eth_unsubscribe", params: [blockSub]});
    return receipt;
  });

  return {
    receipt: data
  }
};