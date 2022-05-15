import React from 'react';
import TransactionBreakdownRow from "./transaction-breakdown-row.component";
import SenderToRecipient from "./sender-to-recipient.component";
import {Box, Text} from '@chakra-ui/react'
import styles from "./transaction-details.module.css";
import { NETWORK_TO_NAME_MAP, MAINNET_NETWORK_ID } from '../utils/constants';
import { formatCurrency, formatBlockNumber } from '../utils/utils';

export function TransactionDetails({ options, from, tx }: any) {
  const networkId = options.chain.networkId,
    networkName = NETWORK_TO_NAME_MAP[networkId],
    tokenName = networkId === MAINNET_NETWORK_ID ? "Eth": `${networkName}Eth`;

  const values = {
    networkName,
    networkId,
    chainId: "0x" + options.chain.chainId.toString(16),
    nonce: "0x" + tx.nonce.toString(16),
    from: tx.from,
    to: tx.to === undefined ?"Contract deploy" : tx.to.toString(),
    blockNumber: formatBlockNumber(options.fork.blockNumber + 1),
    amount: formatCurrency(parseInt(tx.value), tokenName),
    gasLimit: tx.gasLimit.toString(),
    maxPriorityFeePerGas: formatCurrency(tx.maxPriorityFeePerGas, tokenName),
    maxFeePerGas: formatCurrency(tx.maxFeePerGas, tokenName),
    gasPrice: formatCurrency(tx.gasPrice, tokenName)
  };

  return <Box className={styles.transactionDetails}>
    <SenderToRecipient from={values.from} to={values.to} />

    <Box className={styles.header}>Network</Box>
    <TransactionBreakdownRow label="Network" value={values.networkName} />
    <TransactionBreakdownRow label="Chain Id" value={values.chainId} />
    <TransactionBreakdownRow label="Network Id" value={values.networkId} />
    <TransactionBreakdownRow label="Block number" value={values.blockNumber} tooltip="The block number in which the transaction will be simulated"/>

    <Box className={styles.header}>Transaction</Box>
    <TransactionBreakdownRow label="Nonce" value={values.nonce} />
    <TransactionBreakdownRow label="Amount" value={values.amount} />
    <TransactionBreakdownRow label="Gas limit" value={values.gasLimit} />
    <TransactionBreakdownRow label="Gas price" value={values.gasPrice} hideIfUndefined={true}/>
    <TransactionBreakdownRow label="Max priority fee per gas" value={values.maxPriorityFeePerGas} hideIfUndefined={true}/>
    <TransactionBreakdownRow label="Max fee per gas" value={values.maxFeePerGas} hideIfUndefined={true}/>

    <Box className={styles.header}>Raw Data</Box>
    <Text fontSize="sm" className={styles.dataBlock}>0x{tx.data}</Text>
  </Box>
};
