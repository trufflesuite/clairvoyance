import Ganache from "ganache";
import useSWR from "swr";

export const useGanache = (ganacheOptions: any) => {
  const { data, error, mutate } = useSWR("/provider", async () => {
    return Ganache.provider({logging:{logger:{log: () => {}}}, ...ganacheOptions});
  });
  if (error) {
    throw new Error(error);
  }
  return {
    provider: data || null
  };
};