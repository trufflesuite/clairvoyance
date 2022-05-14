import { ProjectDecoder } from '@truffle/decoder';
import { ReceiptDetails } from 'src/receipt-details/receipt-details.component';
import { OpCode } from "src/types/types";
import { Events } from '../events/events.component';
import { Progress } from '../progress/progress.component';
import * as Chakra from "@chakra-ui/react";
import styles from "./transaction-simulation.module.css";
import { Options } from '../types/types';
import { BalanceSummary } from 'src/balance-summary/balance-summary.component';

type TransactionSimulationProps = {
  progress: OpCode | null, 
  receipt: any, 
  decoder: ProjectDecoder | null, 
  callResult: any, 
  options: Options,
  balances: any
}
export function TransactionSimulation({ progress, receipt, decoder, callResult, options, balances }: TransactionSimulationProps ) {
  return (<div>
    <Events decoder={decoder} events={receipt?.logs || null} />
    <Progress progress={progress} />
    <Chakra.Heading fontSize="larger" className={styles.header}>Receipt Details</Chakra.Heading>
    <ReceiptDetails receipt={receipt} callResult={callResult} options={options}/>
    <Chakra.Heading fontSize="larger" className={styles.header}>Balance Summary</Chakra.Heading>
    <BalanceSummary receipt={receipt} balances={balances} options={options}/>
  </div>)
}
