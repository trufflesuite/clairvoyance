import React from 'react';
import * as Chakra from "@chakra-ui/react";
const inspect = require('browser-util-inspect');
import * as Codec from '@truffle/codec';
import Address from './components/decoding/address';
import { TreeItem } from './transaction-decoding.util';
import styles from "./transaction-decoding.module.css";

const OPEN_GROUP_CHAR_MAP:any = {
  array: "[",
  struct: "{"
};
const CLOSE_GROUP_CHAR_MAP:any = {
  array: "]",
  struct: "}"
};


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
            return <span className={styles.number}>{[value.asBN || value.asString].toString()}</span>;
          case 'bytes':
            return (
              <span className={styles.hex}>{value.asHex}</span>
            );
          case 'address': {
            const address = value?.asAddress;
            return (<Address addressOnly checksummedRecipientAddress={address} />);
          }
          case 'string': {
            return <span className={styles.string}>"{value.asString}"</span>;
          }
          case 'array':
            return (
                <div>
                  {value.map((itemValue: any, index: any) => {
                    return (
                      <div>
                        {renderLeaf({
                          typeClass: itemValue.type?.typeClass,
                          value: itemValue.value,
                          kind: itemValue.kind
                        })}{index === value.length - 1 ? "": ","}
                      </div>
                    );
                  })}
                </div>
            );
          default:
            return (<div><span className={styles.raw}>{inspect(new Codec.Format.Utils.Inspect.ResultInspector(value))}</span></div>);
        }
    }
  };

  const renderTree = (
    { name, kind, typeClass, type, value, children }: any,
    index: any,
    elementCount: number
  ) => {
    const terminator = index === elementCount - 1 ? "" :","
    if (typeClass === "array" || typeClass === "struct") {
      const openGroupChar = OPEN_GROUP_CHAR_MAP[typeClass];
      const closeGroupChar = CLOSE_GROUP_CHAR_MAP[typeClass];
      return <div>
        <details>
          <summary style={{cursor: "pointer"}}>
            <span>
              <span className={styles.keyword}>{typeClass}</span>  {name} = {openGroupChar}<span className={styles.args}>...{closeGroupChar}{terminator}</span>
            </span>
          </summary>
          {children ? children.map((e:any,i:number) => renderTree(e,i,children.length)): renderLeaf({ name, typeClass, type, value, kind })}
          {closeGroupChar}{terminator}
        </details>
      </div>;
      } else {
        return <div style={{cursor: "cursor"}}>
          <span className={styles.keyword}>{typeClass}</span>  {name} = {renderLeaf({ name, typeClass, type, value, kind })}{terminator}
        </div>
      }
  };


  const renderTransactionDecoding = () => {
    if (!decoding || !decoding.params) {
      return <Chakra.Text fontSize="sm" className={styles.dataBlock}>Loading...</Chakra.Text>;
    }

    const contractName = decoding && decoding.decoding && decoding.decoding.class.typeName
    const name = decoding && decoding.decoding && decoding.decoding.abi.type === "function" ? decoding.decoding.abi.name : "constructor";
        
    if (showSignature) {
      return <Chakra.Text fontSize="sm" className={styles.dataBlock}>
        <details>
          <summary style={{cursor: "pointer"}}>
          {renderSignature(contractName, name, decoding.params)}
          </summary>
          { decoding.params.map((e:any,i:number) => renderTree(e,i,decoding.params.length))}
          )
        </details>
      </Chakra.Text>;
    } else {
      
      return <div className={styles.noMargin}>
        <Chakra.Text fontSize="sm" className={styles.dataBlock}>
          {decoding.params.map((e:any,i:number) => renderTree(e,i,decoding.params.length))}
        </Chakra.Text>
      </div>;
    }
  };

  return <div className="tx-insight">{renderTransactionDecoding()}</div>;
}


function renderSignature(contractName: string, name: string, args: any[]) {
  return <span>
    <span className={styles.keyword}>function</span> <span className={styles.title}>{contractName}</span>.<span className={styles.title}>{name}</span>(
    <span className={styles.args}>
      {args.map((arg, i) => 
        <span><span className={styles.keyword}>{arg.typeClass}</span> {arg.name}{(i === args.length - 1) ? "": ", "}</span> 
      )})
    </span>
  </span>;
}
