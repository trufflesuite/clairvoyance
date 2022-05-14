import * as Chakra from "@chakra-ui/react";
import PropTypes from 'prop-types';
import { TransactionDecoding } from "../decoding";
import { TransactionSimulation } from '../transaction-simulation/transaction-simulation.component';
import { TransactionDetails} from "../transaction-details/transaction-details.component"
import { Options } from '../types/types';
import { useGanache } from './hooks/useGanache';
import { useDecoder } from './hooks/useDecoder';
import { useTransactionResult } from './hooks/useTransactionResult';
import { useProgress } from "src/transaction-simulation/hooks/useProgress";
import { useTransactionReceipt } from "src/transaction-simulation/hooks/useTransactionReceipt";
import { fetchCompilations } from "src/decoding/fetchCompilations";
import { useBlock } from "./hooks/useBlock";
import { BaseTransaction } from "@ethereumjs/tx/dist/baseTransaction";
import Debugger from "src/debugger/components/Debugger";
import { Events } from "src/events/events.component";
import { Progress } from "src/progress/progress.component";
import { text } from "stream/consumers";

function makeTx(from: string, baseTx: BaseTransaction<any>): any {
  const tx = baseTx.toJSON() as any;
  tx.from = from;
  // protect against sending transactions with a too-high nonce (which will never complete)
  // or that already have a signature
  ["v", "r", "s", "nonce"].forEach((key) => {
    delete tx[key];
  });
  return tx;
}
export function Clairvoyance({ options }: {options: Options}){
  const {provider} = useGanache(options.options);
  const decoderOptions = {provider, addresses: [options.to], compilations: [], networkId: options.networkId};
  const {decoder, compilations} = useDecoder(decoderOptions);

  const {progress, unsubscribe} = useProgress({provider});
  const transaction = makeTx(options.from, options.tx);
  const {receipt, error} = useTransactionReceipt({provider, transaction})
  const {block} = useBlock({provider, blockNumber: options.options.fork.blockNumber});
  const {callResult} = useTransactionResult({provider, block, transaction});

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

  if (error2) {
    return <div>Decoder Error: {error2.message}</div>
  }

  return (
    <Chakra.Box>
      <Chakra.Box>
        <Progress progress={progress} gasLimit={Number(options.tx?.gasLimit || 0)} />
      </Chakra.Box>
      <Chakra.Divider/>
      <Chakra.Tabs>
        <Chakra.TabList>
          <Chakra.Tab>Overview</Chakra.Tab>
          <Chakra.Tab>Result</Chakra.Tab>
          <Chakra.Tab>Logs</Chakra.Tab>
          <Chakra.Tab>Debug</Chakra.Tab>
        </Chakra.TabList>
        <Chakra.TabPanels>
          <Chakra.TabPanel>
            <Chakra.Heading fontSize="larger">Transaction Details</Chakra.Heading>
            <TransactionDetails options={options.options} from={options.from} tx={options.tx} provider={provider} block={block}/>
            
            <Chakra.Divider/>
            
            <Chakra.Heading fontSize="larger">Decoding</Chakra.Heading>
            <TransactionDecoding decoder={decoder} provider={provider} options={options.options} from={options.from} tx={options.tx} networkId={options.networkId} />
          </Chakra.TabPanel>
          <Chakra.TabPanel>
            <TransactionSimulation progress={progress} decoder={eventDecoder} receipt={receipt} callResult={callResult} options={options}/>
          </Chakra.TabPanel>
          <Chakra.TabPanel>
            <Events decoder={decoder} events={receipt?.logs || null} />
          </Chakra.TabPanel>
          <Chakra.TabPanel>
            {receipt && receipt.transactionHash ?
              <Chakra.Box width="100%"
                >
                  <Debugger fetchCompilations={fetchCompilations.bind(null, options.networkId)} provider={provider} transactionHash={receipt.transactionHash} />
              </Chakra.Box>
            : <Chakra.CircularProgress isIndeterminate />}
          </Chakra.TabPanel>
        </Chakra.TabPanels>
      </Chakra.Tabs>
    </Chakra.Box>
  );
} 

Clairvoyance.propTypes = {
  options: PropTypes.object.isRequired
};
