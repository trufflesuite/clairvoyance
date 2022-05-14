import React from 'react';
import ReceiptBreakdownRow from "./receipt-breakdown-row.component";
import {Box, Text} from '@chakra-ui/react'
import styles from "./receipt-details.module.css";
import { formatBlockNumber, formatCurrency } from 'src/transaction-details/transaction-details.util';

const getTypeString = (type: string) => {
  if(type === "0x2") {
    return "Fee Market";
  }
  else if(type === "0x1") {
    return "Access List";
  }
  return "Legacy"
}

export function ReceiptDetails({ receipt }: {receipt: any}) {

  let gasUsed, gasPriceInt, cost;
  if(receipt) {
    gasUsed = parseInt(receipt.gasUsed);
    gasPriceInt = parseInt(receipt.effectiveGasPrice);
    cost = formatCurrency(gasUsed * gasPriceInt, "ETH");
  }
  const values = {
    hash: receipt?.transactionHash || "Loading...", 
    status: receipt ? (receipt.status === "0x1" ? "SUCCESS" : "REVERT") : "Loading...", 
    gasUsed: gasUsed || "Loading...", 
    gasPrice: gasPriceInt ? formatCurrency(gasPriceInt, "ETH"): "Loading...", // todo give proper token
    gasCost: cost || "Loading...",
    blockNumber: receipt ? formatBlockNumber(receipt.blockNumber): "Loading...", 
    index: receipt?.transactionIndex || "Loading...", 
    logsBloom: receipt?.logsBloom || "Loading...", 
    type: receipt ? getTypeString(receipt.type) : "Loading...",
    contractAddress: receipt ? (receipt.contractAddress ? receipt.contractAddress : "N/A") : "Loading..."
  };
  return (<Box className={styles.receiptDetails}>

    <Box className={styles.header}>Transaction</Box>
    <ReceiptBreakdownRow label="Status" value={values.status} />
    <ReceiptBreakdownRow label="Type" value={values.type} />
    <ReceiptBreakdownRow label="Contract Address" value={values.contractAddress} />

    <Box className={styles.header}>Gas</Box>
    <ReceiptBreakdownRow label="Gas Used" value={values.gasUsed} />
    <ReceiptBreakdownRow label="Gas Price" value={values.gasPrice} />
    <ReceiptBreakdownRow label="Gas Cost" value={values.gasCost} />
    
    <Box className={styles.header}>Hash</Box>
    <Text fontSize="sm" className={styles.hashBlock}>0x{values.hash}</Text>
  </Box>)
}
