import { Compilation } from "@truffle/compile-common";
import { forProject } from "@truffle/decoder";
import { EthereumProvider } from "ganache";
import { useEffect } from "react";
import useSWR from "swr/immutable";
import { FETCH_PROJECT_INFO_URI } from "../../decoding/constants";

type DecoderOptions = {provider?: EthereumProvider | null, addresses: string[], compilations: Compilation[], networkId: number};

async function fetchJson(url: string): Promise<any> {
  return fetch(url).then(response => response.json());
}

export const useDecoder = ({provider, addresses, compilations, networkId}: DecoderOptions) => {
  const { data, error, mutate } = useSWR("/decoder-" + addresses.join("-"), async () => {
    if (!provider) return;

    const allCompilations = [...compilations];
    // we do these one at a time because my server can't handle more than that lol
    for (let address of addresses) {
      try {
        const requestUrl = `${FETCH_PROJECT_INFO_URI}?${new URLSearchParams({
          address,
          'network-id': BigInt(networkId).toString(),
        })}`;

        const result = await fetchJson(requestUrl)
        if (result && result.compileResult && result.compileResult.compilations) {
          allCompilations.push.apply(allCompilations, result.compileResult.compilations);
        }
      } catch(e){
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
