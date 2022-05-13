import { Accordion } from "@chakra-ui/react";
import { ProjectDecoder } from "@truffle/decoder"
import {Event} from "../event/event.component";


export function Events({events, decoder}: {decoder: ProjectDecoder | null, events: any[] | null}) {
  function makeEvent(event: any, index: number) {
    return <Event key={"event" + index} decoder={decoder} event={event} />
  }
  return <Accordion allowToggle>
    {events ? (events.length > 0 ? <div><ul>{events.map(makeEvent)}</ul></div> : <div>No events</div>) : <div>waiting on events</div>}
  </Accordion>
}