import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { TransactionDecoding } from "../components/transaction-decoding"
import {TransactionFactory} from "@ethereumjs/tx";
import { useRouter } from 'next/router'
import Common from '@ethereumjs/common';


const Home: NextPage = () => {
  const router = useRouter();
  if (!router.isReady) {
    return (<div className={styles.container}>Loading... </div>);
  }

  let options: any = {view: null};
  try {
    const tx = JSON.parse(router.query.tx as string);
    if (tx) {
      const KNOWN_CHAINIDS = new Set([1, 3, 4, 5, 42, 11155111]);
      const chainId = parseInt(router.query.chainId as string);
      const networkId = parseInt(router.query.networkId as string);
      const common = Common.forCustomChain(
        KNOWN_CHAINIDS.has(chainId) ? chainId : 1,
        {
          name: "ganache-fork",
          defaultHardfork: "london",
          networkId,
          chainId,
          comment: "Local test network fork"
        }
      );
      
      options.tx = TransactionFactory.fromTxData(tx, {common});
      options.from = tx.from;
      options.networkId = networkId;
      options.options = {
        fork: {
          url: router.query.rpcUrl as string,
          blockNumber: parseInt(router.query.blockNumber as string),
        },
        chain: {
          chainId,
          networkId,
        },
        wallet: {
          unlockedAccounts: [tx.from]
        }
      }
    }
  } catch(e) {
    console.error(e)
  }
  
  
  return (
    <div suppressHydrationWarning={true} className={styles.container}>
      <Head>
        <title>Clairvoyance</title>
      </Head>
      {options.tx ? 
        (<TransactionDecoding from={options.from} options={options.options} tx={options.tx} network={options.networkId} />)
        :
        <div>TODO</div>
      }
    </div>
  )
}

export default Home
