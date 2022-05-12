import path from "path";
import React from "react";
import * as Chakra from "@chakra-ui/react";

import type * as Debugger from "src/debugger";

import { useSources } from "../hooks/useSources";
import Source from "./Source";

export interface Props {
  session: Debugger.Session;
}

const Layout = ({
  session
}: Props) => {
  const { sources, status } = useSources({ session });

  if (!sources) {
    return <p>Loading sources, status: {status}</p>;
  }

  return (
    <Chakra.Tabs>
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
          <Chakra.Tab key={id}>{path.basename(sourcePath)}</Chakra.Tab>
        )}
      </Chakra.TabList>

      <Chakra.TabPanels>
        {sources.map(source =>
          <Chakra.TabPanel key={source.id}>
            <Source source={source} />
          </Chakra.TabPanel>
        )}
      </Chakra.TabPanels>
    </Chakra.Tabs>
  );
}
export default Layout;
