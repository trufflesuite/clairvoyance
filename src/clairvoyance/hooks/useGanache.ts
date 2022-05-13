import Ganache from "ganache";
import useSWR from "swr/immutable";

export const useGanache = (ganacheOptions: any) => {
  const { data, error } = useSWR("/provider", async () => {
    return Ganache.provider(ganacheOptions);
  });
  if (error) {
    throw new Error(error);
  }
  return {
    provider: data || null
  };
};