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
    label: "Continue until breakpoint",
    shouldDisable: shouldDisableForwardStepping,
    step: async () => { await session.continueUntilBreakpoint(); }
  },
  next: {
    Icon: () => <Chakra.Icon as={Icons.MdSkipNext} />,
    label: "Step next",
    shouldDisable: shouldDisableForwardStepping,
    step: async () => { await session.stepNext(); }
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
    isStepping ? <Chakra.Spinner />
    : <></>;

  return <Chakra.ButtonGroup>
    {buttons}
    {statusIndicator}
  </Chakra.ButtonGroup>;
};

export default Controls;
