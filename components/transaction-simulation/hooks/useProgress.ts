import { EthereumProvider } from "ganache";
import { useState } from "react";
import useSWR from "swr";
import { OpCode } from "../../types/types";

export const useProgress = ({provider}: {provider: EthereumProvider}) => {
  const [progress, setProgress] = useState<OpCode | null>(null);

  useSWR("/progress-listener", async () => {
    await provider.request({method: "eth_subscribe", params: ["newHeads"]});
    provider.on("ganache:vm:tx:step", (event: any) => {
      setProgress(event.data.opcode);
    });
  });

  return {progress};
};