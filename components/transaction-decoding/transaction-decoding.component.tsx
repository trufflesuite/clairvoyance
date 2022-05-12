import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
const inspect = require('browser-util-inspect');
import { forAddress } from '@truffle/decoder';
import * as Codec from '@truffle/codec';
import Ganache from "ganache";

let counter = 0;
import { transformTxDecoding } from './transaction-decoding.util';
import {
  FETCH_PROJECT_INFO_URI,
  FETCH_SUPPORTED_NETWORKS_URI,
} from './constants';

import Address from './components/decoding/address';
import CopyRawData from './components/ui/copy-raw-data';
import Accreditation from './components/ui/accreditation';
import { BaseTransaction } from '@ethereumjs/tx/dist/baseTransaction';
import { setDefaultResultOrder } from 'dns';

async function fetchWithCache(url: string): Promise<any> {
  return fetch(url).then(response => response.json());
}

export function TransactionDecoding({ options, from, tx, network }: any) {
  const {to, data} = tx.toJSON();

  const [decoding, setDecoding] = useState<[] | void>();
  const [result, setResult] = useState<{} | void>();
  const [events, setEvents] = useState<any[] | void>();
  const [opCode, setOpcode] = useState<{}  | void>();

  const [hasError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const provider = Ganache.provider({logging:{logger:{log: () => {}}},...options});
    (async () => {
      try {
        // decode tx input data
        if (!decoding) {
          const networks = await fetchWithCache(FETCH_SUPPORTED_NETWORKS_URI);

          if (
            !networks.some(
              (n: any) => n.active && BigInt(n.chainId) === BigInt(network),
            )
          ) {
            throw new Error(
              'transactionDecodingUnsupportedNetworkError: ' + network
            );
          }

          const requestUrl = `${FETCH_PROJECT_INFO_URI}?${new URLSearchParams({
            to,
            'network-id': BigInt(network).toString(),
          })}`;
          
          const response = await fetchWithCache(requestUrl);

          const { info: projectInfo, fetchedVia, address } = response;

          // creating instance of the truffle decoder
          const decoder = await forAddress(to, {
            provider,
            projectInfo,
          });

          const _decoding = await decoder.decodeTransaction({
            from,
            to,
            input: data,
            blockNumber: null,
          }) as any;

          // transform tx decoding arguments into tree data
          const params = transformTxDecoding(_decoding?.arguments);
          setDecoding(params);
        }

        if (!result) {
          const subId = await provider.request({method: "eth_subscribe", params: ["logs"]});
          provider.on("message", (event) => {
            const _events = events || [];
            _events.push(event);
            setEvents(_events);
          });

          provider.on("ganache:vm:tx:step", (event) => {
            setOpcode(event.data.opcode);
          });

          const j = tx.toJSON();
          j.from = from;
          const hash = await provider.request({method: "eth_sendTransaction", params: [j]});
          const _result = await provider.request({method: "eth_getTransactionReceipt", params: [hash]});
          await provider.request({method: "eth_unsubscribe", params: [subId]});
          setResult(_result as any)
        }

      } catch (error: any) {
        setError(true);
        if (error?.message.match('400')) {
          setErrorMessage('txInsightsNotSupported');
        } else {
          setErrorMessage(error?.message);
        }
      }
    })();
  }, [options, from, to, network, data]);

  // ***********************************************************
  // component rendering methods
  // ***********************************************************
  const renderLeaf = ({ name, kind, typeClass, value }: any) => {
    switch (kind) {
      case 'error':
        return (
          <span className="sol-item solidity-error">
            <span>{'malformedData'}</span>
          </span>
        );

      default:
        switch (typeClass) {
          case 'int':
            return (
              <span className="sol-item solidity-int">
                {[value.asBN || value.asString].toString()}
              </span>
            );

          case 'uint':
            return (
              <span className="sol-item solidity-uint">
                {[value.asBN || value.asString].toString()}
              </span>
            );

          case 'bytes':
            return (
              <span className="sol-item solidity-bytes">{value.asHex}</span>
            );

          case 'array':
            return (
              <details>
                <summary className="typography--color-black">{name}: </summary>
                <ol>
                  {value.map((itemValue: any, index: any) => {
                    return (
                      <li key={`${itemValue.type?.typeClass}-${index}`}>
                        {renderLeaf({
                          typeClass: itemValue.type?.typeClass,
                          value: itemValue.value,
                          kind: itemValue.kind,
                        })}
                      </li>
                    );
                  })}
                </ol>
              </details>
            );

          case 'address': {
            const address = value?.asAddress;
            return (
              <Address
                addressOnly
                checksummedRecipientAddress={address}
              />
            );
          }
          default:
            return (
              <pre className="sol-item solidity-raw">
                {inspect(new Codec.Format.Utils.Inspect.ResultInspector(value))}
              </pre>
            );
        }
    }
  };

  const renderTree = (
    { name, kind, typeClass, type, value, children }: any,
    index: any,
  ) => {
    return children ? (
      <li key={`${typeClass}-${index}`}>
        <details open={index === 0}>
          <summary>{name}: </summary>
          <ol>{children.map(renderTree)}</ol>
        </details>
      </li>
    ) : (
      <li key={`${typeClass}-${index}`} className="solidity-value">
        <div className="solidity-named-item solidity-item">
          {typeClass !== 'array' && !Array.isArray(value) ? (
            <span className="param-name typography--color-black">{name}: </span>
          ) : null}
          <span className="sol-item solidity-uint">
            {renderLeaf({ name, typeClass, type, value, kind })}
          </span>
        </div>
      </li>
    );
  };

  const renderTransactionDecoding = () => {
    if (hasError) {
      return (
        <div className="tx-insight-error">
          Error: {errorMessage}
        </div>
      );
    }

    return (
      <div className="tx-insight-content">
        {/* replace below */}
        {/* move opCode to own component */}
        <div>{opCode ? JSON.stringify(opCode) : ""}</div>
        
        {/* move events to own component */}
        <div>{events ? JSON.stringify(events) : ""}</div>

        {/* move result own component */}
        <div>{JSON.stringify(result)}</div>
        {/* replace above */}

        <div className="tx-insight-content__tree-component">
          <ol>{decoding? decoding!.map(renderTree) : ""}</ol>
        </div>
        {/* <div className="tx-insight-content__copy-raw-tx">
          <CopyRawData data={data} />
        </div>
        {sourceFetchedVia && sourceAddress ? (
          <div className="tx-insight-content__accreditation">
            <Accreditation
              address={sourceAddress}
              fetchVia={sourceFetchedVia}
            />
          </div>
        ) : null} */}
      </div>
    );
  };

  return <div className="tx-insight">{renderTransactionDecoding()}</div>;
}

TransactionDecoding.propTypes = {
  tx: PropTypes.object.isRequired,
  from: PropTypes.string.isRequired,
  network: PropTypes.number.isRequired,
  options: PropTypes.object.isRequired
};