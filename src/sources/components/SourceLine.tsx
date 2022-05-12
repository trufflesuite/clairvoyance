import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Colors from "../colors";

import type { Source } from "../types";

export const backgroundInherit = Colors.CHOCOLATE_200;
export const backgroundHighlight = Colors.YELLOW_200;
export const borderHighlight = Colors.ORANGE_300;

interface HighlightProps {
  isCurrent: boolean;
}

const Row = styled.div`
  background: ${({ isCurrent }: HighlightProps) =>
    isCurrent ? `${backgroundHighlight}` : `${backgroundInherit}`};
  border-color: ${({ isCurrent }: HighlightProps) =>
    isCurrent ? `${borderHighlight}` : `${backgroundInherit}`};
  border-width: 1px;
  border-style: solid;
  border-radius: 0.4rem;
  width: fit-content;
  min-width: 100%;

  &:hover .fas.fa-dot-circle.faded {
    color: ${Colors.CI_RED};
    opacity: 0.5;
  }
`;

const LineContainer = styled.span`
  font-family: "Ubuntu Mono", monospace;
  white-space: pre;
  padding-left: 0.2rem;
  cursor: text;
`;

const LineNumber = styled.span`
  color: ${Colors.GRAY_300};
  padding-left: 0.2rem;
  cursor: pointer;
`;

interface Breakpoint {
  isBreakpoint: boolean;
}

const Breakpoint = styled.i`
  text-align: center;
  display: inline-block;
  color: ${({ isBreakpoint }: Breakpoint) =>
    isBreakpoint ? Colors.CI_RED : Colors.CHOCOLATE_200};
  cursor: pointer;
  padding-left: 0.2rem;
  width: 1.1rem;
  height: 1rem;
`;

export interface Props {
  source: Source;
  lineContents: string;
  lineNumber: number;
  key: string;
  lineRef: React.RefObject<HTMLDivElement>;
  lineNumbersGutterWidth: number;
}

const SourceLine = ({
  source,
  lineContents,
  lineNumber,
  lineRef,
  lineNumbersGutterWidth,
}: Props) => {
  const displayLineNumber = (lineNumber + 1).toString();
  const paddedLineNumber = `${
    " ".repeat(lineNumbersGutterWidth - displayLineNumber.length)
  }${
    displayLineNumber
  }`;

  return (
    <Row
      key={`contract-source-${lineNumber}`}
      isCurrent={false}
      ref={lineRef}
    >
      <LineContainer>
        <LineNumber>
          {paddedLineNumber}.{` `}
        </LineNumber>
        <span dangerouslySetInnerHTML={{ __html: lineContents }} />
      </LineContainer>
    </Row>
  );
};

export default SourceLine;
