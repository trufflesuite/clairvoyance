import React, { useEffect, useState } from 'react';
import {Text} from "@chakra-ui/react";
import PropTypes from 'prop-types';
import * as Codec from '@truffle/codec';
import { transformTxDecoding, TreeItem } from './transaction-decoding.util';
import {Decoding} from "./decoding.component";
import { ProjectDecoder } from '@truffle/decoder';
import { AnyTxtRecord } from 'dns';
import styles from "./transaction-decoding.module.css";

export function TransactionDecoding({ decoder, options, from, tx, networkId }: {decoder: ProjectDecoder | null, options: AnyTxtRecord, from: string, tx: any, networkId: number}) {
  const {to, data} = tx.toJSON();
  const [decoding, setDecoding] = useState<{params: TreeItem[], decoding: Codec.FunctionDecoding | Codec.ConstructorDecoding | Codec.LogDecoding}>();

  useEffect(() => {
    (async () => {
      // decode tx input data
      if (decoder) {
        const _decoding = await decoder.decodeTransaction({
          from,
          to,
          input: data,
          blockNumber: null,
        }) as Codec.FunctionDecoding | Codec.ConstructorDecoding | Codec.LogDecoding;

        // transform tx decoding arguments into tree data
        const params = transformTxDecoding(_decoding?.arguments);
        setDecoding({params, decoding: _decoding});
      }
    })();
  }, [decoder, options, from, to, networkId, data]);

  return <div>
    <Text className={styles.header}>Contract call</Text>
    <Decoding decoding={decoding} showSignature={true}/>
  </div>
}

TransactionDecoding.propTypes = {
  tx: PropTypes.object.isRequired,
  from: PropTypes.string.isRequired,
  networkId: PropTypes.number.isRequired,
  options: PropTypes.object.isRequired,
  provider: PropTypes.object.isRequired,
  decoder: PropTypes.object
};