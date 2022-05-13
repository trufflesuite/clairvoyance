import { BaseTransaction } from '@ethereumjs/tx/dist/baseTransaction';
import { Compilation } from '@truffle/compile-common';
import { ProjectDecoder } from '@truffle/decoder';
import { EthereumProvider } from 'ganache';
import { useDecoder } from '../clairvoyance/hooks/useDecoder';
import { Events } from '../events/events.component';
import { Progress } from '../progress/progress.component';
import { useProgress } from './hooks/useProgress';
import { useTransactionReceipt } from './hooks/useTransactionReceipt';

export function TransactionSimulation({ compilations, provider, tx, from, networkId }: {networkId: number, compilations: Compilation[], provider: EthereumProvider, tx: BaseTransaction<any>, from: string}) {
  const {progress, unsubscribe} = useProgress({provider});
  const {receipt} = useTransactionReceipt({provider, tx, from})

  const addresses: string[] = receipt ? Array.from(new Set([
    receipt.contractAddress,
    ...receipt.logs.map((log: any) => log.address)
  ])).filter((address: string) => !!address) : [];

  const decoderOptions = {provider, addresses, compilations, networkId};
  const {decoder} = useDecoder(decoderOptions);

  if (unsubscribe && receipt) {
    unsubscribe();
  }

  return (<div>
    <Events decoder={decoder} events={receipt?.logs || null} />
    <Progress progress={progress} />
    <pre><code>{JSON.stringify(receipt, null, 2)}</code></pre>
  </div>)
}
