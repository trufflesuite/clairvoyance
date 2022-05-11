import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { TransactionDecoding } from "../components/transaction-decoding"
import {TransactionFactory} from "@ethereumjs/tx";
import { useRouter } from 'next/router'


const Home: NextPage = () => {
  const router = useRouter();
  if (!router.isReady) {
    return (<div className={styles.container}>Loading... </div>);
  }

  let options;
  try {
    options = JSON.parse(router.query.q as string);
    if (options.raw) {
      options.tx = TransactionFactory.fromSerializedData(Buffer.from(options.raw.slice(2), "hex"));
    }
  } catch(e) {
    options = {};
  }
  
  
  return (
    <div suppressHydrationWarning={true} className={styles.container}>
      <Head>
        <title>Clairvoyance</title>
      </Head>
      {options.view === "simulate" ? 
        (<TransactionDecoding options={options.options} tx={options.tx} network={options.network} />)
        :
        <div>TODO</div>
      }
    </div>
  )
}

export default Home
