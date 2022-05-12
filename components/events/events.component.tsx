import { ContractInstanceDecoder } from "@truffle/decoder"
import {Event} from "../event/event.component";


export function Events({events, decoder}: {decoder: ContractInstanceDecoder | null, events: any[] | null}) {
  function makeEvent(event: any, index: number) {
    return <li key={"event_" + index.toString()}><Event decoder={decoder} event={event} /></li>
  }
  return <div className="events">
    {events ? (events.length > 0 ? <div><ul>{events.map(makeEvent)}</ul></div> : <div>No events</div>) : <div>waiting on events</div>}
  </div>
}