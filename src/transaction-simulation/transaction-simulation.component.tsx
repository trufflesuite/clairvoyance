import { BaseTransaction } from '@ethereumjs/tx/dist/baseTransaction';
import { ContractInstanceDecoder } from '@truffle/decoder';
import { EthereumProvider } from 'ganache';
import { useState } from 'react';
import { Events } from '../events/events.component';
import { Progress } from '../progress/progress.component';
import { OpCode } from '../types/types';
import { useProgress } from './hooks/useProgress';
import { useTransactionReceipt } from './hooks/useTransactionReceipt';


export function TransactionSimulation({ decoder, provider, tx, from }: {decoder: ContractInstanceDecoder | null, provider: EthereumProvider, tx: BaseTransaction<any>, from: string}) {
  const {progress} = useProgress({provider});
  const {receipt} = useTransactionReceipt({provider, tx, from})

  return (<div>
    <Events decoder={decoder} events={receipt?.logs || null} />
    <Progress progress={progress} />
    <pre><code>{JSON.stringify(receipt, null, 2)}</code></pre>
  </div>)
}
