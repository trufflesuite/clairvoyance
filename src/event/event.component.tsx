import { ContractInstanceDecoder } from "@truffle/decoder"
import { useEffect, useState } from "react";

export function Event({event, decoder}: {decoder: ContractInstanceDecoder | null, event: any}) {
  const [decodedEvent, setDecodedEvent] = useState<any | null>(null);
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
        setDecodedEvent(_decoded);
      } catch(e) {
        console.error(e);
      }
    })();
  }, [decoder, event]);

  return <div className="events">
    {decodedEvent ? <div>{JSON.stringify(decodedEvent)}</div> : <div>Decoding...</div>}
  </div>
}