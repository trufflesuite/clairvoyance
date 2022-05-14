import React from 'react';
import * as Chakra from "@chakra-ui/react";
const inspect = require('browser-util-inspect');
import * as Codec from '@truffle/codec';
import Address from './components/decoding/address';
import { TreeItem } from './transaction-decoding.util';
import styles from "./transaction-decoding.module.css";

export function Decoding({ decoding, showSignature }: {showSignature: boolean,  decoding?:{ params: TreeItem[], decoding: Codec.FunctionDecoding | Codec.ConstructorDecoding | Codec.LogDecoding}}) {
// ***********************************************************
  // component rendering methods
  // ***********************************************************
  const renderLeaf = ({ name, kind, typeClass, value }: any) => {
    switch (kind) {
      case 'error':
        return (
          <span className="error">{'malformedData'}</span>
        );

      default:
        switch (typeClass) {
          case 'int':
          case 'uint':
            return (<span className={styles.number}>{[value.asBN || value.asString].toString()}</span>);
          case 'bytes':
            return (
              <span className={styles.hex}>{value.asHex}</span>
            );
          case 'array':
            return (
                <Chakra.UnorderedList>
                  {value.map((itemValue: any, index: any) => {
                    return (
                      <li>
                        {renderLeaf({
                          typeClass: itemValue.type?.typeClass,
                          value: itemValue.value,
                          kind: itemValue.kind,
                        })}{index === value.length - 1 ? "": ","}
                      </li>
                    );
                  })}
                </Chakra.UnorderedList>
            );

          case 'address': {
            const address = value?.asAddress;
            return (<Address addressOnly checksummedRecipientAddress={address} />);
          }
          default:
            return (<span className={styles.raw}>{inspect(new Codec.Format.Utils.Inspect.ResultInspector(value))}</span>);
        }
    }
  };

  const renderTree = (
    { name, kind, typeClass, type, value, children }: any,
    index: any,
    elementCount: number
  ) => {
    const isLast = index === elementCount - 1;
    return <Chakra.ListItem key={`${typeClass}-${index}`}>
      <span className={styles.keyword}>{typeClass}</span> {name} = {typeClass==="array" ? "[": ""}
        {children ? children.map((e:any,i:number) => renderTree(e,i,children.length)): renderLeaf({ name, typeClass, type, value, kind })}
        {typeClass==="array" ? "]": ""}{isLast ? "": ","}
    </Chakra.ListItem>
  };

  const renderTransactionDecoding = () => {
    const contractName = decoding && decoding.decoding && decoding.decoding.class.typeName
    const name = decoding && decoding.decoding && decoding.decoding.abi.type === "function" ? decoding.decoding.abi.name : "constructor";
        
    return showSignature ?
    <Chakra.Text fontSize="sm" className={styles.dataBlock}>
      <span className={styles.keyword}>function</span> <span className={styles.title}>{contractName}.{name}</span>(
        <Chakra.UnorderedList>{decoding && decoding.params ? decoding.params.map((e:any,i:number) => renderTree(e,i,decoding.params.length)): "Loading..."}</Chakra.UnorderedList>
      )
    </Chakra.Text> :
    <Chakra.Text fontSize="sm" className={styles.dataBlock}>
      <Chakra.UnorderedList className={styles.noMargin}>{decoding && decoding.params ? decoding.params.map((e:any,i:number) => renderTree(e,i,decoding.params.length)): "Loading..."}</Chakra.UnorderedList>
  </Chakra.Text>

  };
  return <div className="tx-insight">{renderTransactionDecoding()}</div>;
}