import React, { useEffect, useState } from 'react';
import TransactionBreakdownRow from "./transaction-breakdown-row.component";
import SenderToRecipient from "./sender-to-recipient.component";
const inspect = require('browser-util-inspect');
import {Flex, Box, Divider} from '@chakra-ui/react'
import styles from "./sender-to-recipient.module.css";

export function TransactionDetails({ options, from, tx, tokenName = "Eth", decimal = 18 }: any) {
  //const toElement = tx && tx.to ? <ListItem>To: {tx.to.toString("hex")}</ListItem> : null;
  
  function formatCurrency(value: number) {
    return `${value / Math.pow(18, decimal)} ${tokenName}`;
  }

  const values = {
    to: tx.to.toString("hex"),
    from,
    nonce: "0x" + tx.nonce.toString(16), // number
    networkName: "Mainnet",
    chainId: tx.chainId.toString("hex"),
    networkId: options.chain.networkId,
    rpcUrl: options.fork.url,
    blockNumber: options.fork.blockNumber,

    amount: formatCurrency(Number(tx.value) / decimal), 
    gasLimit: tx.gasLimit.toString("hex"),
    gasPrice: formatCurrency(Number(tx.maxFeePerGas) + Number(tx.maxPriorityFeePerGas)),
    totalCost: formatCurrency(Number(tx.value) + Number(tx.maxFeePerGas) + Number(tx.maxPriorityFeePerGas) * Number(tx.gasLimit))
  };

  return <Box className={styles.transactionDetails}>
    <SenderToRecipient from={values.from} to={values.to} />
    <Divider/>

    <Box className={styles.header}>Network</Box>
    <TransactionBreakdownRow label="Network" value={values.networkName} />
    <TransactionBreakdownRow label="Rpc Url" value={values.rpcUrl} />
    <TransactionBreakdownRow label="Chain Id" value={values.chainId} />
    <TransactionBreakdownRow label="Network Id" value={values.networkId} />
    <TransactionBreakdownRow label="Block Number" value={values.blockNumber} />

    <Box className={styles.header}>Transaction</Box>
    <TransactionBreakdownRow label="Nonce" value={values.nonce} />
    <TransactionBreakdownRow label="Amount" value={values.amount} />
    <TransactionBreakdownRow label="Gas limit" value={values.gasLimit} />
    <TransactionBreakdownRow label="Gas price" value={values.gasPrice} />
    <TransactionBreakdownRow label="Total" value={values.totalCost} />
  </Box>
};