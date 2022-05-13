import { FETCH_PROJECT_INFO_URI } from "./constants";
import type * as Common from "@truffle/compile-common";

export async function fetchCompilations(networkId: number, address: string): Promise<Common.Compilation[]> {
  const requestUrl = `${FETCH_PROJECT_INFO_URI}?${new URLSearchParams({
    address,
    'network-id': BigInt(networkId).toString(),
  })}`
  const response = await fetch(requestUrl);
  const result = await response.json();
  return result?.compileResult?.compilations || [];
}