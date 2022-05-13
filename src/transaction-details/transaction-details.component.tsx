import React from 'react';
import TransactionBreakdownRow from "./transaction-breakdown-row.component";
import SenderToRecipient from "./sender-to-recipient.component";
import {Box, Text} from '@chakra-ui/react'
import styles from "./transaction-details.module.css";
import { NETWORK_TO_NAME_MAP, formatCurrency, formatBlockNumber, MAINNET_NETWORK_ID } from './transaction-details.util';
import {useBlock} from "./hooks/useBlock";

export function TransactionDetails({ options, from, tx, provider }: any) {
  const block = useBlock({provider, blockNumber: options.fork.blockNumber});
  let gasFee = undefined,
    totalCost = undefined;
  if (block !== undefined) {
    const maxGasFee = Math.min(parseInt(block.baseFeePerGas) + parseInt(tx.maxPriorityFeePerGas), parseInt(tx.maxFeePerGas));
    gasFee = maxGasFee * parseInt(tx.gasLimit);
    totalCost = gasFee + parseInt(tx.value)
  }

  const networkId: string = options.chain.networkId;
  const networkName = NETWORK_TO_NAME_MAP[networkId];
  const tokenName = networkId === MAINNET_NETWORK_ID ? "Eth": `${networkName}Eth`;
  
  const values = {
    to: tx.to.toString(),
    from,
    networkName,
    networkId,
    nonce:`0x${tx.nonce.toString(16)}`,
    chainId: `0x${tx.chainId.toString("hex")}`,
    blockNumber: formatBlockNumber(options.fork.blockNumber),
    amount: formatCurrency(parseInt(tx.value), tokenName),
    gasFee: gasFee === undefined? "Loading..." : formatCurrency(gasFee, tokenName),
    totalCost: totalCost === undefined? "Loading..." : formatCurrency(totalCost, tokenName)
  };

  return <Box className={styles.transactionDetails}>
    <SenderToRecipient from={values.from} to={values.to} />

    <Box className={styles.header}>Network</Box>
    <TransactionBreakdownRow label="Network" value={values.networkName} />
    <TransactionBreakdownRow label="Chain Id" value={values.chainId} />
    <TransactionBreakdownRow label="Network Id" value={values.networkId} />
    <TransactionBreakdownRow label="Block Number" value={values.blockNumber} />

    <Box className={styles.header}>Transaction</Box>
    <TransactionBreakdownRow label="Nonce" value={values.nonce} />
    <TransactionBreakdownRow label="Amount" value={values.amount} />
    <TransactionBreakdownRow label="Gas fee (maximum)" value={values.gasFee} />
    <TransactionBreakdownRow label="Total" value={values.totalCost} />
    
    <Box className={styles.header}>Data</Box>
    <Text fontSize="sm" className={styles.dataBlock}>0x{tx.data}</Text>
  </Box>
};
