import { ProjectDecoder } from '@truffle/decoder';
import { ReceiptDetails } from 'src/receipt-details/receipt-details.component';
import * as Chakra from "@chakra-ui/react";
import styles from "./transaction-simulation.module.css";
import { Options } from '../types/types';
import { BalanceSummary } from 'src/balance-summary/balance-summary.component';
import * as Codec from '@truffle/codec'
const inspect = require("browser-util-inspect");

type TransactionSimulationProps = {
  receipt: any,
  decoder: ProjectDecoder | null, 
  returnValueDecoding: any, 
  options: Options,
  balances: any,
  rawReturnValue: string | undefined
}
export function TransactionSimulation({ receipt, returnValueDecoding, options, balances, rawReturnValue }: TransactionSimulationProps ) {

  return (<div>
    <Chakra.Heading fontSize="larger" className={styles.header}>Receipt Details</Chakra.Heading>
    <ReceiptDetails receipt={receipt} rawReturnValue={rawReturnValue} options={options}/>
    <Chakra.Box className={styles.header}>Decoded Result</Chakra.Box>
    {returnValueDecoding ? <Chakra.Text className={styles.dataBlock}>{inspect(new Codec.Export.ReturndataDecodingInspector(returnValueDecoding))}</Chakra.Text> : <Chakra.Text className={styles.dataBlock}>Loading...</Chakra.Text>}
    <Chakra.Heading fontSize="larger" className={styles.header}>Balance Summary</Chakra.Heading>
    <BalanceSummary receipt={receipt} balances={balances} options={options}/>
  </div>)
}
