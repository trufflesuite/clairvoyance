import useSWR from "swr/immutable";
import { useEffect } from 'react';
import * as Codec from '@truffle/codec';
import { transformTxDecoding } from './../../decoding/transaction-decoding.util'
import { ProjectDecoder } from '@truffle/decoder';

export const useTransactionDecoding = ({ decoder, from, tx }: {decoder: ProjectDecoder | null, from: string, tx: any,}) => {

  const {data, error, mutate} = useSWR("/transaction-decoding", async () => {
    if (!decoder) return;
    const {to, data} = tx.toJSON();
    const _decoding = await decoder.decodeTransaction({
      from,
      to,
      input: data,
      blockNumber: null,
    }) as Codec.FunctionDecoding | Codec.ConstructorDecoding | Codec.LogDecoding;
    // transform tx decoding arguments into tree data
    const params = transformTxDecoding(_decoding?.arguments);
    return {params, decoding: _decoding}
  });

  useEffect(() => {
    if (decoder) {
      mutate();
    }
  }, [decoder]);

  return { decoding: data?.decoding, params: data?.params};
};