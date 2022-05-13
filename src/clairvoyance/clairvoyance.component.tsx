import PropTypes from 'prop-types';
import { useState } from 'react';
import { TransactionDecoding } from "../decoding";
import { TransactionSimulation } from '../transaction-simulation/transaction-simulation.component';
import { TransactionDetails} from "../transaction-details/transaction-details.component"
import { Options } from '../types/types';
import { useGanache } from './hooks/useGanache';
import { useDecoder } from './hooks/useDecoder';


export function Clairvoyance({ options }: {options: Options}){
  const [tab, setTab] = useState<"simulation" | "debug">("simulation");
  const {provider} = useGanache(options.options);
  const decoderOptions = {provider, addresses: [options.to], compilations: [], networkId: options.networkId};
  const {decoder, compilations} = useDecoder(decoderOptions);

  if(!provider){
    return <div>Loading...</div>
  }

  return (
    <div className="tx-insight">
      <TransactionDetails options={options.options} from={options.from} tx={options.tx}/>
      <TransactionDecoding decoder={decoder} provider={provider} options={options.options} from={options.from} tx={options.tx} networkId={options.networkId} />
      <div className="tabs">
        <div className="tab-container>">
          <button className={tab === "simulation" ? "tab-active" : ""} onClick={()=>setTab(
            "simulation"
          )}>Simulation</button>
          <button className={tab === "debug" ? "tab-active" : ""} onClick={()=>setTab(
            "debug"
          )}>Debug</button>
        </div>
        <div className="tabContents">
          { tab === "simulation" ? <TransactionSimulation networkId={options.networkId} from={options.from} tx={options.tx} compilations={compilations} provider={provider} /> : <div>todo</div> }
        </div>
      </div>
    </div>
  );
}

Clairvoyance.propTypes = {
  options: PropTypes.object.isRequired
};
