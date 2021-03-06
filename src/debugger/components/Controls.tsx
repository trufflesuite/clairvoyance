import React, { useState } from "react";
import { useSWRConfig } from "swr";
import * as Chakra from "@chakra-ui/react";
import * as Icons from "react-icons/md";

import { selectors as $ } from "@truffle/debugger";

import * as Debugger from "../types";

export interface Props {
  session: Debugger.Session;
}

interface DisableOptions {
  isStepping: boolean;
  isAtStart: boolean;
  isAtEnd: boolean;
}

const shouldDisableForwardStepping = ({
  isStepping,
  isAtEnd
}: DisableOptions) => isStepping || isAtEnd;

const getSessionActions = (session: Debugger.Session): {
  [key: string]: {
    Icon: () => React.ReactElement;
    label: string;
    shouldDisable: (options: DisableOptions) => boolean;
    step: () => Promise<void>;
  }
} => ({
  continue: {
    Icon: () => <Chakra.Icon as={Icons.MdLabel} />,
    label: "Run to end",
    shouldDisable: shouldDisableForwardStepping,
    step: async () => { await session.continueUntilBreakpoint(); }
  },
  next: {
    Icon: () => <Chakra.Icon as={Icons.MdSkipNext} />,
    label: "Step next",
    shouldDisable: shouldDisableForwardStepping,
    step: async () => { await session.stepNext(); }
  },
  over: {
    Icon: () => <Chakra.Icon as={Icons.MdFastForward} />,
    label: "Step over",
    shouldDisable: shouldDisableForwardStepping,
    step: async () => { await session.stepOver(); }
  },
  into: {
    Icon: () => <Chakra.Icon as={Icons.MdDownload} />,
    label: "Step into",
    shouldDisable: shouldDisableForwardStepping,
    step: async () => { await session.stepInto(); }
  },
  out: {
    Icon: () => <Chakra.Icon as={Icons.MdUpload} />,
    label: "Step out",
    shouldDisable: shouldDisableForwardStepping,
    step: async () => { await session.stepOut(); }
  },
  reset: {
    Icon: () => <Chakra.Icon as={Icons.MdReplay} />,
    label: "Reset to beginning",
    shouldDisable: ({ isStepping, isAtStart }) => isStepping || isAtStart,
    step: async () => { await session.reset(); }
  }
});

const Controls = ({
  session
}: Props) => {
  const [isStepping, setIsStepping] = useState(false);
  const isAtStart = session.view($.trace.index) === 0;
  const isAtEnd = session.view($.trace.finished);

  const { mutate } = useSWRConfig();

  const refresh = () => {
    mutate("/variables");
    mutate("/currentSourceRange");
  }

  const actions = getSessionActions(session);
  const buttons = Object.entries(actions)
    .map(([key, { Icon, label, step, shouldDisable }]) =>
      <Chakra.Tooltip key={key} label={label}>
        <Chakra.IconButton
          aria-label={label}
          icon={<Icon />}
          disabled={shouldDisable({ isStepping, isAtStart, isAtEnd })}
          onClick={() => {
            setIsStepping(true);
            setTimeout(async () => {
              await step();
              refresh();
              setIsStepping(false);
            }, 0);
          }}
        />
      </Chakra.Tooltip>
    );

  const statusIndicator =
    isStepping ?
      <Chakra.Tag colorScheme="orange" size="sm">
        <Chakra.Spinner size="sm" />
        <Chakra.Text>&nbsp;Stepping...</Chakra.Text>
      </Chakra.Tag>
    : isAtEnd ?
      <Chakra.Tag colorScheme="teal" variant="solid" size="sm">
        <Chakra.Text>Transaction ended.</Chakra.Text>
      </Chakra.Tag>
    : <></>;

  return <Chakra.ButtonGroup>
    {buttons}
    {statusIndicator}
  </Chakra.ButtonGroup>;
};

export default Controls;
