import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {TransactionFactory} from "@ethereumjs/tx";
import { useRouter } from 'next/router'
import Common from '@ethereumjs/common';
import { Clairvoyance } from '../src/clairvoyance/clairvoyance.component';
import { ParsedUrlQuery } from 'querystring';
import { Options } from '../src/types/types';
import { Box } from '@chakra-ui/react';
import truffleLogo from './truffle-logomark.svg';
import truffleWord from './truffle-wordmark-dark.svg';
import metamaskLogo from './MetaMask.svg';


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
      // make sure we can handle both ways
      tx.data = tx.data || tx.input;
      tx.gasLimit = tx.gasLimit || tx.gas;

      options.tx = TransactionFactory.fromTxData(tx, {common});
      options.from = tx.from;
      options.networkId = networkId;
      options.chainId = chainId;
      options.to = options.tx.to!.toString();
      options.options = {
        //logging: {logger:{log: () => {}}},
        fork: {
          url: query.rpcUrl as string,
          blockNumber: parseInt(query.blockNumber as string),
        },
        chain: {
          chainId,
          networkId,
        },
        wallet: {
          totalAccounts: 0,
          unlockedAccounts: [tx.from]
        },
        miner: {
          timestampIncrement: 8 // seconds
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

  return (
    <div suppressHydrationWarning={true} className={styles.container}>
      <Head>
        <title>Clairvoyance</title>
      </Head>
      <Box className="logos">
        <img src={metamaskLogo.src} style={{display:"inline-block"}} height="30" width="162" />
        <div className="right" style={{height:"30px",display: "flex", alignItems: "center"}}>
          <img style={{height:"12px", marginRight:"8px"}} src={truffleWord.src} />
          <img style={{height:"30px"}} src={truffleLogo.src} />
        </div>
      </Box>
      <Box className="main">
        <Clairvoyance options={options} />
      </Box>
    </div>
  )
}

export default Home
