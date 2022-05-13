import React from 'react';
const inspect = require('browser-util-inspect');
import * as Codec from '@truffle/codec';
import Address from './components/decoding/address';

export function Decoding({ decoding }: any) {
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
    return (
      <div className="tx-insight-content">
        <div className="tx-insight-content__tree-component">
          <ol>{decoding ? decoding.map(renderTree): "Loading..."}</ol>
        </div>
      </div>
    );
  };

  return <div className="tx-insight">{renderTransactionDecoding()}</div>;
}