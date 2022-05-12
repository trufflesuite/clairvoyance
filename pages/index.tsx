import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {TransactionFactory} from "@ethereumjs/tx";
import { useRouter } from 'next/router'
import Common from '@ethereumjs/common';
import { Clairvoyance } from '../components/clairvoyance/clairvoyance.component';
import { ParsedUrlQuery } from 'querystring';
import { Options } from '../components/types/types';

function getOptions(query: ParsedUrlQuery): Options{
  let options = {} as unknown as Options;
  try {
    const tx = JSON.parse(query.tx as string);
    if (tx) {
      const KNOWN_CHAINIDS = new Set([1, 3, 4, 5, 42, 11155111]);
      const chainId = parseInt(query.chainId as string);
      const networkId = parseInt(query.networkId as string);
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
      options.chainId = chainId;
      options.to = options.tx.to!.toString();
      options.options = {
        fork: {
          url: query.rpcUrl as string,
          blockNumber: parseInt(query.blockNumber as string),
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
  return options;
}

const Home: NextPage = () => {
  const router = useRouter();
  if (!router.isReady) {
    return (<div className={styles.container}>Loading... </div>);
  }

  const options = getOptions(router.query);
  
  console.log("init Home");
  return (
    <div suppressHydrationWarning={true} className={styles.container}>
      <Head>
        <title>Clairvoyance</title>
      </Head>
      <Clairvoyance options={options} />
    </div>
  )
}

export default Home
