import { FETCH_PROJECT_INFO_URI } from "./constants";
import type * as Common from "@truffle/compile-common";

const cache = new Map<string, Promise<Common.Compilation[]>>();
export async function fetchCompilations(networkId: number, address: string): Promise<Common.Compilation[]> {
  const requestUrl = `${FETCH_PROJECT_INFO_URI}?${new URLSearchParams({
    address,
    'network-id': BigInt(networkId).toString(),
  })}`
  if (cache.has(requestUrl)) return await cache.get(requestUrl)!;
  
  const compilations = fetch(requestUrl).then(async response => {
    const result = await response.json();
    return result?.compileResult?.compilations || [];
  });
  cache.set(requestUrl, compilations);
  return compilations;
}