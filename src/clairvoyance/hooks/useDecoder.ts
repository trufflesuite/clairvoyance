import { forAddress } from "@truffle/decoder";
import { EthereumProvider } from "ganache";
import { useEffect } from "react";
import useSWR from "swr";
import { FETCH_PROJECT_INFO_URI, FETCH_SUPPORTED_NETWORKS_URI } from "src/decoding/constants";

type DecoderOptions = {key?: string, provider?: EthereumProvider | null, to: string, networkId: number, chainId: number};

async function fetchJson(url: string): Promise<any> {
  return fetch(url).then(response => response.json());
}

export const useDecoder = ({key, provider, to, networkId, chainId}: DecoderOptions) => {
  const { data, error, mutate } = useSWR("/decoder-" + key, async () => {
    if (!provider) return;

    // decode tx input data
    const networks = await fetchJson(FETCH_SUPPORTED_NETWORKS_URI);

    if (
      !networks.some(
        (n: any) => n.active && BigInt(n.chainId) === BigInt(chainId),
      )
    ) {
      throw new Error(
        'transactionDecodingUnsupportedNetworkError: ' + chainId
      );
    }

    const requestUrl = `${FETCH_PROJECT_INFO_URI}?${new URLSearchParams({
      address: to,
      'network-id': BigInt(networkId).toString(),
    })}`;

    const response = await fetchJson(requestUrl);

    // creating instance of the truffle decoder
    const decoder = await forAddress(to, {
      provider,
      projectInfo: {
        commonCompilations: response.compileResult.compilations
      }
    });
    return {commonCompilations: response.compileResult.compilations, decoder}
  });

  useEffect(() => {
    if (provider) {
      mutate();
    }
  }, [provider]);

  return {
    commonCompilations: data?.commonCompilations || null,
    decoder: data?.decoder || null,
  };
};
