import * as Chakra from "@chakra-ui/react";
import PropTypes from 'prop-types';
import { TransactionDecoding } from "../decoding";
import { TransactionSimulation } from '../transaction-simulation/transaction-simulation.component';
import { TransactionDetails} from "../transaction-details/transaction-details.component"
import { Options } from '../types/types';
import { useGanache } from './hooks/useGanache';
import { useDecoder } from './hooks/useDecoder';


export function Clairvoyance({ options }: {options: Options}){
  const {provider} = useGanache(options.options);
  const decoderOptions = {provider, addresses: [options.to], compilations: [], networkId: options.networkId};
  const {decoder, compilations} = useDecoder(decoderOptions);

  if (!provider) {
    return <div>Loading...</div>
  }

  return (
    <Chakra.Box>
      <TransactionDetails options={options.options} from={options.from} tx={options.tx}/>
      <TransactionDecoding decoder={decoder} provider={provider} options={options.options} from={options.from} tx={options.tx} networkId={options.networkId} />
      <Chakra.Tabs>
        <Chakra.TabList>
          <Chakra.Tab>Simulation</Chakra.Tab>
          <Chakra.Tab>Debugger</Chakra.Tab>
        </Chakra.TabList>
        <Chakra.TabPanels>
          <Chakra.TabPanel>
            <TransactionSimulation networkId={options.networkId} from={options.from} tx={options.tx} compilations={compilations} provider={provider} />
          </Chakra.TabPanel>
          <Chakra.TabPanel>
            Debug panel
          </Chakra.TabPanel>
        </Chakra.TabPanels>
      </Chakra.Tabs>
    </Chakra.Box>
  );
}

Clairvoyance.propTypes = {
  options: PropTypes.object.isRequired
};
