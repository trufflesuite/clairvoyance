import React, {
  createRef,
  useRef,
  useEffect,
  useState,
  useLayoutEffect,
  MutableRefObject
} from "react";
import * as Chakra from "@chakra-ui/react";
import unified from "unified";
import stringify from "rehype-dom-stringify";
import low from "lowlight";
import hljsSolidity from "highlightjs-solidity";

import * as Codec from "@truffle/codec";

import type * as Debugger from "src/debugger";
import * as Sources from "../types";

import SourceLine from "./SourceLine";
import SyntaxStyle from "./SyntaxStyle";

type Breakpoint = unknown;

low.registerLanguage("solidity", hljsSolidity.solidity);

export interface Props {
  source: Sources.Source;
  selectedLineNumber?: number;
}

const Source = ({
  source,
  selectedLineNumber
}: Props) => {
  const { id, sourcePath, contents } = source;
  const [scrollTop, setScrollTop] = useState(0);
  const sourceRef = useRef<HTMLDivElement>(null);

  const processor = unified().use(stringify);
  const highlightedSource = processor
    .stringify({
      type: "root",
      children: low.highlight("solidity", contents).value
    } as any)
    .toString();

  console.debug("highlightedSource: %s", highlightedSource);
  const lines = highlightedSource.split("\n");

  // width of the gutter equals width of the longest line number
  // (i.e., the width of the last line number, since they go in order)
  //
  // *note* that we use `lines.length` here, not `lines.length - 1`, since
  // display will add 1 to all these because that's what people are used to
  const lineNumbersGutterWidth = lines.length.toString().length;

  // create all the refs in advance
  const lineRefs = lines.map((line, index) => createRef<HTMLDivElement>());

  // const selectedLineRef = lineRefs[selectedLineNumber];

  const sourceLines = lineRefs.map((lineRef, index) => {
    const line = lines[index];
    return <SourceLine
      source={source}
      lineContents={line}
      lineNumber={index}
      key={`${id}-line-${index}`}
      lineRef={lineRef}
      lineNumbersGutterWidth={lineNumbersGutterWidth}
    />;
  });

  return <Chakra.Container minWidth="100%">
    <Chakra.Heading>{sourcePath}</Chakra.Heading>
    <SyntaxStyle>{sourceLines}</SyntaxStyle>
  </Chakra.Container>;
}

export default Source;

