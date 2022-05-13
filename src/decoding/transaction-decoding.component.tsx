import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
const inspect = require('browser-util-inspect');
import * as Codec from '@truffle/codec';
import { transformTxDecoding } from './transaction-decoding.util';
import Address from './components/decoding/address';
import {Decoding} from "./decoding.component";

export function TransactionDecoding({ decoder, options, from, tx, networkId }: any) {
  const {to, data} = tx.toJSON();
  const [decoding, setDecoding] = useState<[] | void>();

  useEffect(() => {
    (async () => {
      // decode tx input data
      if (decoder) {
        const _decoding = await decoder.decodeTransaction({
          from,
          to,
          input: data,
          blockNumber: null,
        });

        // transform tx decoding arguments into tree data
        const params = transformTxDecoding(_decoding?.arguments);
        setDecoding(params);
      }
    })();
  }, [decoder, options, from, to, networkId, data]);

  return <Decoding decoding={decoding} />;
}

TransactionDecoding.propTypes = {
  tx: PropTypes.object.isRequired,
  from: PropTypes.string.isRequired,
  networkId: PropTypes.number.isRequired,
  options: PropTypes.object.isRequired,
  provider: PropTypes.object.isRequired,
  decoder: PropTypes.object
};