import { Compilation } from "@truffle/compile-common";
import { forProject } from "@truffle/decoder";
import { EthereumProvider } from "ganache";
import { useEffect } from "react";
import useSWR from "swr";
import { FETCH_PROJECT_INFO_URI } from "../../decoding/constants";

type DecoderOptions = {provider?: EthereumProvider | null, addresses: string[], compilations: Compilation[], networkId: number};

async function fetchJson(url: string): Promise<any> {
  return fetch(url).then(response => response.json());
}

export const useDecoder = ({provider, addresses, compilations, networkId}: DecoderOptions) => {
  const { data, error, mutate } = useSWR("/decoder-" + addresses.join("-"), async () => {
    if (!provider) return;

    const addressPromises = addresses.map(async (address) => {
      const requestUrl = `${FETCH_PROJECT_INFO_URI}?${new URLSearchParams({
        address,
        'network-id': BigInt(networkId).toString(),
      })}`;

      return await fetchJson(requestUrl);
    });
    const results = (await Promise.all(addressPromises));

    const allCompilations= [...compilations, ...results.flatMap((result) => result.compileResult.compilations)];

    // creating instance of the truffle decoder
    const decoder = await forProject({
      provider,
      projectInfo: {
        commonCompilations: allCompilations
      }
    });

    return {compilations: allCompilations, decoder}
  });

  useEffect(() => {
    if (provider) {
      mutate();
    }
  }, [provider]);

  return {
    compilations: data?.compilations || [],
    decoder: data?.decoder || null,
  };
};
