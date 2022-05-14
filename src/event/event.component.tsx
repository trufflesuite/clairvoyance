import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Progress } from "@chakra-ui/react";
import { ProjectDecoder } from "@truffle/decoder"
import { useEffect, useState } from "react";
import { Decoding } from "src/decoding/decoding.component";
import { transformTxDecoding } from "src/decoding/transaction-decoding.util";
import { Code } from '@chakra-ui/react'

type UnPromisify<T> = T extends Promise<infer U> ? U : T;
export type LogDecodings = UnPromisify<ReturnType<ProjectDecoder["decodeLog"]>>;

export function Event({event, decoder}: {decoder: ProjectDecoder | null, event: any}) {
  const [decodedEvents, setDecodedEvents] = useState<LogDecodings | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const _decoded = await decoder?.decodeLog({
          address: event.address,
          data: event.data,
          topics: event.topics,
          logIndex: parseInt(event.logIndex, 16),
          transactionIndex: parseInt(event.transactionIndex, 16),
          transactionHash: event.transactionHash,
          blockHash: event.blockHash,
          blockNumber: parseInt(event.blockNumber, 16)
        }, {extras: "necessary"});
        setDecodedEvents(_decoded || null);
      } catch(e) {
        console.log(e);
      }
    })();
  }, [decoder, event]);

  let eventName;
  let eventDetails;
  if (decodedEvents) {
    if (decodedEvents.length > 0) {
      const decodedEvent = decodedEvents[0]
      eventName = <>{parseInt(event.logIndex)+1}: {decodedEvent.class.typeName + "." + decodedEvent.abi.name}({decodedEvent.abi.inputs.map(input => input.name).join(", ")})</>;
      eventDetails = <Decoding decoding={{params: transformTxDecoding(decodedEvent?.arguments), decoding: decodedEvent}} />;
    } else {
      eventName = <i>{parseInt(event.logIndex)+1}: unknown event</i>;
      eventDetails = <>
        <div>This event couldn't be decoded. Here is what we know:</div>
        <Code display="block" whiteSpace="pre" lang="json" children={JSON.stringify(event, null, 2)}/>
      </>;
    }
  } else {
    eventDetails = <>
      <div>{parseInt(event.logIndex)+1}: decoding event</div>
      <Progress size='xs' isIndeterminate />
    </>;
    eventName = <>Decoding...</>;
  }

  return (
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box flex='1' textAlign='left'>
          {eventName}
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      {eventDetails}
    </AccordionPanel>
  </AccordionItem>
  );
}