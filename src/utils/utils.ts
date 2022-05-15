
export function formatBlockNumber(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatCurrency(value: number, tokenName: string = "Eth",  decimal = 18) {
  if (value === undefined) {
    return undefined;
  }
  const valueString = (value * Math.pow(10,-decimal)).toFixed(decimal).replace(/(?<=\d)[.0]*$/, "");

  return `${valueString} ${tokenName}`
}

export function getType(type: string) {
  if(!type) {
    return "Loading..."
  }
  else if(type === "0x2") {
    return "Fee Market";
  }
  else if(type === "0x1") {
    return "Access List";
  }
  return "Legacy"
}

export function getStatus(status: string) {
  if(!status) return "Loading...";
  return status === "0x1" ? "SUCCESS" : "REVERT";
}

export function getContractAddress(contractAddress: string) {
  if(contractAddress === undefined) return "Loading...";
  if(!contractAddress) return "N/A";
  return contractAddress;
}
