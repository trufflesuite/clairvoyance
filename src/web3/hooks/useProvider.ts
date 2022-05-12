import Web3 from "web3";

export interface UseProviderOptions {
  url: string;
}

export const useProvider = ({
  url
}: UseProviderOptions) => {
  return new Web3.providers.HttpProvider(url);
}
