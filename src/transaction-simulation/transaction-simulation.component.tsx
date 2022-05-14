import { ProjectDecoder } from '@truffle/decoder';
import { ReceiptDetails } from 'src/receipt-details/receipt-details.component';
import * as Chakra from "@chakra-ui/react";
import styles from "./transaction-simulation.module.css";
import { Options } from '../types/types';

export function TransactionSimulation({ receipt, decoder, callResult, options }: {receipt: any, decoder: ProjectDecoder | null, callResult: any, options: Options}) {
  return (<div>
    <Chakra.Heading fontSize="larger" className={styles.header}>Receipt Details</Chakra.Heading>
    <ReceiptDetails receipt={receipt} callResult={callResult} options={options}/>
  </div>)
}
