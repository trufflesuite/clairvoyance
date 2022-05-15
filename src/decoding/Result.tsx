import React from "react";
import * as Chakra from "@chakra-ui/react";
import * as Codec from "@truffle/codec";

import styles from "./transaction-decoding.module.css";

const inspect = require("browser-util-inspect");

const OPEN_GROUP_CHAR_MAP:any = {
  array: "[",
  struct: "{"
};
const CLOSE_GROUP_CHAR_MAP:any = {
  array: "]",
  struct: "}"
};



export interface Props {
  result: Codec.Format.Values.Result;
}

export const Result = ({
  result
}: Props) => {
  if (result.kind === "error") {
    return <Chakra.Text>Error decoding value</Chakra.Text>;
  }

  if (isIntegral(result)) {
    return <span className={styles.number}>{
      [result.value.asBN].toString()
    }</span>;
  }

  if (isBytes(result)) {
    return <span className={styles.hex}>{
      result.value.asHex
    }</span>;
  }

  if (isString(result)) {
    return <span className={styles.string}>
      &quot;{
        "asString" in result.value
          ? result.value.asString
          : "<malformed>"
      }&quot;
    </span>;
  }

  if (isArray(result)) {
    return <Chakra.UnorderedList>{
      result.value.map((item, index) =>
        <Chakra.ListItem key={index}>
          <Result result={item} />
        </Chakra.ListItem>
      )
    }</Chakra.UnorderedList>;
  }

  if (isStruct(result)) {
    return <div>
      <details>
        <summary>
          <span className={styles.keyword}>{result.type.typeClass}</span>
          {"{"}
          <span className={styles.args}>...</span>
          {"}"}
        </summary>
        <Chakra.UnorderedList>{
          result.value.map(({ name, value }, index) =>
            <Chakra.ListItem key={index}>
              {name} = <Result result={value} />
            </Chakra.ListItem>
          )
        }</Chakra.UnorderedList>
      </details>
    </div>;
  }

  return (<span className={styles.raw}>{
    inspect(new Codec.Format.Utils.Inspect.ResultInspector(result))
  }</span>);
}

function isIntegral(
  result: Codec.Format.Values.Value
): result is Codec.Format.Values.IntValue | Codec.Format.Values.UintValue {
  return ["uint", "int"].includes(result.type.typeClass);
}

function isBytes(
  result: Codec.Format.Values.Value
): result is Codec.Format.Values.BytesValue {
  return result.type.typeClass === "bytes";
}

function isArray(
  result: Codec.Format.Values.Value
): result is Codec.Format.Values.ArrayValue {
  return result.type.typeClass === "array";
}

function isAddress(
  result: Codec.Format.Values.Value
): result is Codec.Format.Values.AddressValue {
  return result.type.typeClass === "address";
}

function isString(
  result: Codec.Format.Values.Value
): result is Codec.Format.Values.StringValue {
  return result.type.typeClass === "string";
}

function isStruct(
  result: Codec.Format.Values.Value
): result is Codec.Format.Values.StructValue {
  return result.type.typeClass === "struct";
}

