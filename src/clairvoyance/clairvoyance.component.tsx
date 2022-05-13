import * as Chakra from "@chakra-ui/react";
import PropTypes from 'prop-types';
import { TransactionDecoding } from "../decoding";
import { TransactionSimulation } from '../transaction-simulation/transaction-simulation.component';
import { TransactionDetails} from "../transaction-details/transaction-details.component"
import { Options } from '../types/types';
import { useGanache } from './hooks/useGanache';
import { useDecoder } from './hooks/useDecoder';
import { Debugger } from "src/debugger";
import { useProgress } from "src/transaction-simulation/hooks/useProgress";
import { useTransactionReceipt } from "src/transaction-simulation/hooks/useTransactionReceipt";
import { fetchCompilations } from "src/decoding/fetchCompilations";

export function Clairvoyance({ options }: {options: Options}){
  const {provider} = useGanache(options.options);
  const decoderOptions = {provider, addresses: [options.to], compilations: [], networkId: options.networkId};
  const {decoder, compilations} = useDecoder(decoderOptions);

  const {progress, unsubscribe} = useProgress({provider});
  const {receipt, error} = useTransactionReceipt({provider, tx: options.tx, from: options.from})

  const addresses: string[] = receipt ? Array.from(new Set([
    receipt.contractAddress,
    ...receipt.logs.map((log: any) => log.address)
  ])).filter((address: string) => !!address) : [];

  const eventDecoderOptions = {provider, addresses, compilations, networkId: options.networkId};
  const {decoder: eventDecoder, error: error2} = useDecoder(eventDecoderOptions);

  if (!provider) {
    return <div>Loading...</div>
  }

  if (unsubscribe && receipt) {
    unsubscribe();
  }

  if (error) {
    return <div>Transaction Error: {error.message}</div>
  }
  if (error2) {
    return <div>Decoder Error: {error2.message}</div>
  }

  return (
    <Chakra.Box>
      <Chakra.Heading fontSize="larger">Transaction Details</Chakra.Heading>
      <TransactionDetails options={options.options} from={options.from} tx={options.tx} provider={provider}/>
      
      <Chakra.Divider/>
      
      <Chakra.Heading fontSize="larger">Decoding</Chakra.Heading>
      <TransactionDecoding decoder={decoder} provider={provider} options={options.options} from={options.from} tx={options.tx} networkId={options.networkId} />
      <Chakra.Tabs>
        <Chakra.TabList>
          <Chakra.Tab>Simulation</Chakra.Tab>
          <Chakra.Tab>Debugger</Chakra.Tab>
        </Chakra.TabList>
        <Chakra.TabPanels>
          <Chakra.TabPanel>
            <TransactionSimulation progress={progress} decoder={eventDecoder} receipt={receipt} />
          </Chakra.TabPanel>
          <Chakra.TabPanel>
            {receipt && receipt.transactionHash ? <Debugger fetchCompilations={fetchCompilations.bind(null, options.networkId)} provider={provider} transactionHash={receipt.transactionHash} /> : <Chakra.CircularProgress isIndeterminate />}
          </Chakra.TabPanel>
        </Chakra.TabPanels>
      </Chakra.Tabs>
    </Chakra.Box>
  );
}

Clairvoyance.propTypes = {
  options: PropTypes.object.isRequired
};
