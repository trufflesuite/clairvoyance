import { ProjectDecoder } from '@truffle/decoder';
import { ReceiptDetails } from 'src/receipt-details/receipt-details.component';
import { OpCode } from "src/types/types";
import { Events } from '../events/events.component';
import { Progress } from '../progress/progress.component';
import * as Chakra from "@chakra-ui/react";
import styles from "./transaction-simulation.module.css";

export function TransactionSimulation({ progress, receipt, decoder }: {progress: OpCode | null, receipt: any, decoder: ProjectDecoder | null}) {
  return (<div>
    <Events decoder={decoder} events={receipt?.logs || null} />
    <Progress progress={progress} />
    <Chakra.Heading fontSize="larger" className={styles.header}>Receipt Details</Chakra.Heading>
    <ReceiptDetails receipt={receipt}/>
  </div>)
}
