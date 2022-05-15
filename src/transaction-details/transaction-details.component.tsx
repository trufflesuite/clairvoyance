import React from 'react';
import TransactionBreakdownRow from "./transaction-breakdown-row.component";
import SenderToRecipient from "./sender-to-recipient.component";
import {Box, Text} from '@chakra-ui/react'
import styles from "./transaction-details.module.css";
import { NETWORK_TO_NAME_MAP, MAINNET_NETWORK_ID } from '../utils/constants';
import { formatCurrency, formatBlockNumber } from '../utils/utils';

export function TransactionDetails({ options, from, tx, block }: any) {
  let gasFee = undefined,
    totalCost = undefined;
  if (block !== undefined) {
    const maxGasFee = parseInt(block.baseFeePerGas);
    gasFee = maxGasFee * parseInt(tx.gasLimit);
    totalCost = gasFee + parseInt(tx.value);
  }

  const networkId: string = options.chain.networkId,
    chainId: string = "0x" + options.chain.chainId.toString(16),
    nonce = "0x" + tx.nonce.toString(16),
    networkName = NETWORK_TO_NAME_MAP[networkId],
    tokenName = networkId === MAINNET_NETWORK_ID ? "Eth": `${networkName}Eth`,
    to = tx.to === undefined ?"Contract deploy" : tx.to.toString(),
    blockNumber = formatBlockNumber(options.fork.blockNumber),
    amount = formatCurrency(parseInt(tx.value), tokenName),
    gasFeeValue = gasFee === undefined? "Loading..." : formatCurrency(gasFee, tokenName),
    totalCostValue = totalCost === undefined? "Loading..." : formatCurrency(totalCost, tokenName);

  const values = {
    to,
    from,
    networkName,
    networkId,
    nonce,
    chainId,
    blockNumber,
    amount,
    gasFeeValue,
    totalCostValue
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
    <TransactionBreakdownRow label="Gas fee (maximum)" value={values.gasFeeValue} />
    <TransactionBreakdownRow label="Total" value={values.totalCostValue} />
    
    <Box className={styles.header}>Raw Data</Box>
    <Text fontSize="sm" className={styles.dataBlock}>0x{tx.data}</Text>
  </Box>
};
