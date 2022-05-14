import * as Codec from '@truffle/codec';

export type TreeItem = {
  name?: string,
  kind: "value" | "error",
  typeClass: "string" | "function" | "uint" | "int" | "bool" | "bytes" | "address" | "fixed" | "ufixed" | "enum" | "userDefinedValueType" | "contract" | "array" | "mapping" | "struct" | "tuple" | "magic" | "type" | "options",
  type: Codec.Format.Values.Result["type"],
  children? : TreeItem[],
  value?: Codec.Format.Values.Result
}

// *********************************************
// data transformation utils
// *********************************************
export const transformTxDecoding = (params: Codec.AbiArgument[] = []): TreeItem[] => {
  return params.map((node) => {
    const nodeName = node.name;
    const nodeValue = node.value;
    const nodeKind = nodeValue.kind;
    const nodeTypeClass = nodeValue.type.typeClass;

    const treeItem = {
      name: nodeName,
      kind: nodeKind,
      typeClass: nodeTypeClass,
      type: nodeValue.type,
    };

    if (nodeTypeClass === 'struct') {
      return {
        ...treeItem,
        // @ts-ignore
        children: transformTxDecoding(nodeValue.value),
      };
    }

    return {
      ...treeItem,
      // @ts-ignore
      value: nodeValue.value ? nodeValue.value : nodeValue,
    };
  });
};
