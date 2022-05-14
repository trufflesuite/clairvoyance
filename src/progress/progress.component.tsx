import * as Chakra from "@chakra-ui/react";
import PropTypes from 'prop-types';
import { StepEvent } from '../types/types';
export function Progress({ progress, gasLimit }: {gasLimit: number | null, progress: StepEvent | null}) {
  gasLimit = gasLimit || 0;
  return (<Chakra.Box>
    <Chakra.Stat>
      <Chakra.Progress size="xs" min={0} max={gasLimit} value={progress ? gasLimit - Number(progress.gasLeft) : 0} />
      <Chakra.StatLabel>Running transaction locally and collecting insights...</Chakra.StatLabel>
      <Chakra.StatNumber>{progress ? progress.opcode.name : "initializing"}</Chakra.StatNumber>
      <Chakra.StatHelpText>{progress ? progress.gasLeft + " gas left" : ""}</Chakra.StatHelpText>
    </Chakra.Stat>
  </Chakra.Box>)
}

Progress.propTypes = {
  progress: PropTypes.object
};