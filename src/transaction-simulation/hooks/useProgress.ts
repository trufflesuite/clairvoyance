import { EthereumProvider } from "ganache";
import { useEffect, useState } from "react";
import useSWR from "swr/immutable";
import { OpCode } from "../../types/types";

export const useProgress = ({provider}: {provider: EthereumProvider | null}) => {
  const [progress, setProgress] = useState<OpCode | null>(null);

  const {data, error, mutate} = useSWR("/progress-listener", async () => {
    if(!provider) return;
    await provider.request({method: "eth_subscribe", params: ["newHeads"]});
    return provider.on("ganache:vm:tx:step", (event: any) => {
      setProgress(event.data.opcode);
    });
  });

  useEffect(() => {
    if (provider) {
      mutate();
    }
  }, [provider]);

  return {progress, unsubscribe: data};
};