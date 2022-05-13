import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from "@chakra-ui/react";
import { ProjectDecoder } from "@truffle/decoder"
import { useEffect, useState } from "react";
import { Decoding } from "src/decoding/decoding.component";
import { transformTxDecoding } from "src/decoding/transaction-decoding.util";

type UnPromisify<T> = T extends Promise<infer U> ? U : T;
type LogDecodings = UnPromisify<ReturnType<ProjectDecoder["decodeLog"]>>;

export function Event({event, decoder}: {decoder: ProjectDecoder | null, event: any}) {
  const [decodedEvent, setDecodedEvent] = useState<LogDecodings | null>(null);
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
        setDecodedEvent(_decoded || null);
      } catch(e) {
        console.error(e);
      }
    })();
  }, [decoder, event]);

  return (
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box flex='1' textAlign='left'>
          {decodedEvent && decodedEvent.length > 0 ? <>{decodedEvent[0].class.typeName + "." + decodedEvent[0].abi.name}({decodedEvent[0].abi.inputs.map(input => input.name).join(", ")})</> : <>Decoding...</>}
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      {decodedEvent && decodedEvent.length > 0 ? <Decoding decoding={transformTxDecoding(decodedEvent[0]?.arguments)} /> : <>Decoding...</>}
    </AccordionPanel>
  </AccordionItem>
  );
}