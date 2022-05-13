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
  currentSourceRange?: Sources.SourceRange;
}

const Source = ({
  source,
  currentSourceRange
}: Props) => {
  const { id, sourcePath, contents } = source;
  const [scrollTop, setScrollTop] = useState(0);
  const sourceRef = useRef<HTMLDivElement>(null);

  const [highlightedSource, setHighlightedSource] =
    useState<string | undefined>();

  useEffect(() => {
    Promise.resolve().then(() => {
      const processor = unified().use(stringify);
      setHighlightedSource(
        processor
        .stringify({
          type: "root",
          children: low.highlight("solidity", contents).value
        } as any)
        .toString()
      );
    });
  }, [contents]);

  if (!highlightedSource) {
    return <p>Highlighting source...</p>;
  }

  console.debug("highlightedSource %s", highlightedSource);
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
    const selected = (
      !!currentSourceRange &&
      index >= currentSourceRange.start.line && (
        currentSourceRange.end.line === null ||
        index <= currentSourceRange.end.line
      )
    );

    return <SourceLine
      source={source}
      lineContents={line}
      lineNumber={index}
      key={`${id}-line-${index}`}
      selected={selected}
      lineRef={lineRef}
      lineNumbersGutterWidth={lineNumbersGutterWidth}
    />;
  });

  return <Chakra.Box>
    <Chakra.Heading>{sourcePath}</Chakra.Heading>
      <SyntaxStyle>{sourceLines}</SyntaxStyle>
  </Chakra.Box>;
}

export default Source;

