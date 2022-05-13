import { Compilation } from "@truffle/compile-common";
import { forProject } from "@truffle/decoder";
import { EthereumProvider } from "ganache";
import { useEffect } from "react";
import { fetchCompilations } from "src/decoding/fetchCompilations";
import useSWR from "swr/immutable";

type DecoderOptions = {provider?: EthereumProvider | null, addresses: string[], compilations: Compilation[], networkId: number};

export const useDecoder = ({provider, addresses, compilations, networkId}: DecoderOptions) => {
  const { data, error, mutate } = useSWR("/decoder-" + addresses.join("-"), async () => {
    if (!provider) return;

    const allCompilations: Compilation[] = [...compilations];
    // we do these one at a time because my server can't handle more than that lol
    for (const address of addresses) {
      try {
        allCompilations.push.apply(allCompilations, await fetchCompilations(networkId, address));
      } catch(e) {
        console.error(e);
      }
    }

    // creating instance of the truffle decoder
    const decoder = await forProject({
      provider,
      projectInfo: {
        commonCompilations: allCompilations
      }
    });

    return {compilations: allCompilations, decoder};
  });

  useEffect(() => {
    if (provider) {
      mutate();
    }
  }, [provider]);

  return {
    error,
    compilations: data?.compilations || [],
    decoder: data?.decoder || null,
  };
};
