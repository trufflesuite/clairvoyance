import React, {
  createRef,
  useRef,
  useEffect,
  useState,
  useLayoutEffect,
  MutableRefObject
} from "react";
import * as Colors from "../colors";
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
    useState<string>("");

  const currentStartLine = currentSourceRange?.start.line || 0;

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

  const lines = highlightedSource.split("\n");

  // width of the gutter equals width of the longest line number
  // (i.e., the width of the last line number, since they go in order)
  //
  // *note* that we use `lines.length` here, not `lines.length - 1`, since
  // display will add 1 to all these because that's what people are used to
  const lineNumbersGutterWidth = lines.length.toString().length;

  // create all the refs in advance
  const lineRefs = lines.map((line, index) => createRef<HTMLDivElement>());

  useEffect(() => {
    lineRefs[currentStartLine]?.current?.scrollIntoView({
      block: "center",
      inline: "nearest"
    });
  }, [currentStartLine, lineRefs]);


  const sourceLines = lineRefs.map((lineRef, index) => {
    const line = lines[index];
    const selected = (
      !!currentSourceRange &&
      index >= currentSourceRange.start.line && (
        currentSourceRange.end.line === null ||
        currentSourceRange.end.column === null ||
        (
          currentSourceRange.end.column === 0 && index < currentSourceRange.end.line
        ) ||
        (
          currentSourceRange.end.column > 0 && index <= currentSourceRange.end.line
        )
      )
    );
    const isMultiLine =  !!currentSourceRange && currentSourceRange.start.line !== currentSourceRange.end.line;

    const displayLineNumber = (index + 1).toString();
    const paddedLineNumber = `${
      " ".repeat(lineNumbersGutterWidth - displayLineNumber.length)
    }${
      displayLineNumber
    }`;

    const el = selected && !isMultiLine ?
      <div style={{paddingLeft: "0.4rem", fontFamily: '"Ubuntu Mono",monospace',whiteSpace: "pre",position:"absolute",left:0, top:0}}>
          {' '.repeat(lineNumbersGutterWidth + currentSourceRange.start.column + 2)}
          <span style={{background:Colors.YELLOW_200}}>
            {currentSourceRange.end.column ? ' '.repeat(currentSourceRange.end.column - currentSourceRange.start.column) : ""}
          </span>
        </div> : null;
    return <div style={{position:"relative"}}>
      <SourceLine
        source={source}
        lineContents={line}
        lineNumber={index}
        key={`${id}-line-${index}`}
        selected={isMultiLine ? selected : false}
        lineRef={lineRef}
        lineNumbersGutterWidth={lineNumbersGutterWidth}
      />
      {el}
    </div>;
  });

  return <Chakra.Box>
    <Chakra.Heading>{sourcePath}</Chakra.Heading>
    <Chakra.Box height="65vh" backgroundColor={Colors.CHOCOLATE_200} overflow="scroll">
      <SyntaxStyle>{sourceLines}</SyntaxStyle>
    </Chakra.Box>
  </Chakra.Box>;
}

export default Source;

