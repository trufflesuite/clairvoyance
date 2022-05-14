import path from "path";
import React, { useState, useEffect } from "react";
import * as Chakra from "@chakra-ui/react";
import * as ChakraIcons from "@chakra-ui/icons";
import { useSWRConfig } from "swr";

import { selectors as $ } from "@truffle/debugger";

import type * as Debugger from "src/debugger";

import { useSources } from "../hooks/useSources";
import { useCurrentSourceRange } from "../hooks/useCurrentSourceRange";
import Source from "./Source";

export interface Props {
  session: Debugger.Session;
}

const Sources = ({
  session
}: Props) => {
  // @ts-ignore
  window.bugger = session;
  // @ts-ignore
  window.mutate = useSWRConfig().mutate;
  const {
    sources,
    status: sourcesStatus
  } = useSources({ session });

  const {
    currentSourceRange,
    status: currentSourceRangeStatus
  } = useCurrentSourceRange({ session });

  const tabIndexesBySourceId = (sources || [])
    .map(({ id }, index) => ({ [id]: index }))
    .reduce((a, b) => ({ ...a, ...b }), {})

  const [tabIndex, setTabIndex] = useState(0);
  const [traceIndexAtTabChange, setTraceIndexAtTabChange] =
    useState<number | undefined>(undefined);
  const currentTraceIndex = currentSourceRange?.traceIndex;
  const currentSourceId = currentSourceRange?.source.id;
  const currentTabIndex = tabIndexesBySourceId[currentSourceId || ""] || 0;
  console.debug("currentTabIndex %s", currentTabIndex);

  useEffect(() => {
    if (!currentSourceId) {
      return;
    }

    if (currentTraceIndex !== traceIndexAtTabChange) {
      setTabIndex(currentTabIndex);
    }
  }, [currentSourceId, currentTabIndex, currentTraceIndex, traceIndexAtTabChange]);

  if (!sources) {
    return <p>Loading sources, status: {sourcesStatus}</p>;
  }

  return (
    <Chakra.Tabs
      index={tabIndex}
      onChange={(index) => {
        setTraceIndexAtTabChange(currentTraceIndex);
        setTabIndex(index);
      }}
    >
      <Chakra.TabList
        overflowY="hidden"
        sx={{
          scrollbarWidth: 'none',
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {sources.map(({ id, sourcePath }) =>
          id === currentSourceId
            ? <Chakra.Tab key={id}><ChakraIcons.ChevronRightIcon />{path.basename(sourcePath)}</Chakra.Tab>
            : <Chakra.Tab key={id}>{path.basename(sourcePath)}</Chakra.Tab>
        )}
      </Chakra.TabList>

      <Chakra.TabPanels>
        {sources.map(source =>
          <Chakra.TabPanel key={source.id}>
            {currentSourceRange && currentSourceRange.source.id === source.id
              ? <Source source={source} currentSourceRange={currentSourceRange} />
              : <Source source={source} />
            }
          </Chakra.TabPanel>
        )}
      </Chakra.TabPanels>
    </Chakra.Tabs>
  );
}
export default Sources;
