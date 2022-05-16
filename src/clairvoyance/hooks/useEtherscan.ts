const NETWORK_ID_TO_URL_PREFIX_MAP: any = {
  1: "https://etherscan.io/address/",
  3: "https://ropsten.etherscan.io/address/",
  4: "https://rinkeby.etherscan.io/address/",
  5: "https://goerli.etherscan.io/address/",
  42: "https://kovan.etherscan.io/address/"
};

export const useEtherscanAddressUrl = (networkId: number, address: string) => {
  const urlPrefix: any = NETWORK_ID_TO_URL_PREFIX_MAP[networkId];
  if (urlPrefix === undefined || address === undefined) {
    return undefined;
  }

  return urlPrefix + address;
};
