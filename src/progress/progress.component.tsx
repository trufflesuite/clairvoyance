import * as Chakra from "@chakra-ui/react";
import PropTypes from 'prop-types';
import { StepEvent } from '../types/types';
export function Progress({ progress, gasLimit, receipt }: {receipt: any, gasLimit: number | null, progress: StepEvent | null}) {
  gasLimit = gasLimit || 0;
  const style: any = {
    float: "right",
    margin: "1.9em"
  }
  if (receipt) {
    return (<Chakra.Box>
      <Chakra.Progress hasStripe size="xs" value={100} />
      <Chakra.Heading style={{display:"inline-block"}} padding="1em" size="md">Simulation Complete</Chakra.Heading>
      {receipt.status === "0x1"
        ? <Chakra.Badge style={style}>Success</Chakra.Badge>
        : <Chakra.Badge style={style} colorScheme="red">Rejected</Chakra.Badge>
    }
    </Chakra.Box>)
  }
  return (<Chakra.Box>
    <Chakra.Progress hasStripe size="xs" min={0} max={gasLimit} value={progress ? gasLimit - (Number(progress.gasLeft) + Number(progress.gasRefund)) : 0} />
    <Chakra.Heading style={{display:"inline-block"}} padding="1em" size="md">Simulating transaction...</Chakra.Heading>
    <Chakra.Badge style={style} colorScheme='purple'>{progress ? progress.gasLeft + " gas left" : ""}</Chakra.Badge>
    <Chakra.Badge style={style} colorScheme='purple'>{progress ? progress.opcode.name : "initializing"}</Chakra.Badge>
  </Chakra.Box>)
}

Progress.propTypes = {
  progress: PropTypes.object
};