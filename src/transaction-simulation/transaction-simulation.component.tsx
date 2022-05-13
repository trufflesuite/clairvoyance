import { ProjectDecoder } from '@truffle/decoder';
import { OpCode } from "src/types/types";
import { Events } from '../events/events.component';
import { Progress } from '../progress/progress.component';

export function TransactionSimulation({ progress, receipt, decoder }: {progress: OpCode | null, receipt: any, decoder: ProjectDecoder | null}) {
  return (<div>
    <Events decoder={decoder} events={receipt?.logs || null} />
    <Progress progress={progress} />
    <pre><code>{JSON.stringify(receipt, null, 2)}</code></pre>
  </div>)
}
