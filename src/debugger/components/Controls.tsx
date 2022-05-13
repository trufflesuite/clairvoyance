import React from "react";
import { useSWRConfig } from "swr";
import * as Chakra from "@chakra-ui/react";
import * as Icons from "react-icons/md";

import * as Debugger from "../types";

export interface Props {
  session: Debugger.Session;
}

const getSessionActions = (session: Debugger.Session) => ({
  next: {
    Icon: () => <Chakra.Icon as={Icons.MdSkipNext} />,
    label: "Step next",
    step: async () => { await session.stepNext(); }
  }
});

const Controls = ({
  session
}: Props) => {
  const { mutate } = useSWRConfig();

  const refresh = () => {
    mutate("/variables");
    mutate("/currentSourceRange");
  }

  const actions = getSessionActions(session);
  const buttons = Object.entries(actions)
    .map(([key, { Icon, label, step }]) =>
      <Chakra.Tooltip key={key} label={label}>
        <Chakra.IconButton
          aria-label={label}
          icon={<Icon />}
          onClick={() => step().then(refresh)}
        />
      </Chakra.Tooltip>
    );


  return <Chakra.ButtonGroup>
    {buttons}
  </Chakra.ButtonGroup>;
};

export default Controls;
