import React from 'react';
import ReceiptBreakdownRow from "./receipt-breakdown-row.component";
import {Box, Text} from '@chakra-ui/react'
import styles from "./receipt-details.module.css";
import { MAINNET_NETWORK_ID, NETWORK_TO_NAME_MAP } from 'src/utils/constants';
import { getContractAddress, getStatus, getType, formatCurrency } from 'src/utils/utils';


export function ReceiptDetails({ options, receipt, callResult }: any) {

  const networkId = options.options.chain.networkId;
  const networkName = NETWORK_TO_NAME_MAP[networkId];
  const tokenName = networkId === MAINNET_NETWORK_ID ? "Eth": `${networkName}Eth`;
  let gasUsed, gasPriceInt, cost, gasPrice;
  if(receipt) {
    gasUsed = parseInt(receipt.gasUsed);
    gasPriceInt = parseInt(receipt.effectiveGasPrice);
    cost = formatCurrency(gasUsed * gasPriceInt, tokenName);
    gasPrice = formatCurrency(gasPriceInt,tokenName);
  }
  
  return (<Box className={styles.receiptDetails}>
    <Box className={styles.header}>Transaction</Box>
    <ReceiptBreakdownRow label="Status" value={getStatus(receipt?.status)} />
    <ReceiptBreakdownRow label="Type" value={getType(receipt?.type)} />
    <ReceiptBreakdownRow label="Result" value={callResult || "Loading..."} />
    <ReceiptBreakdownRow label="Contract Address" value={getContractAddress(receipt?.contractAddress)} />

    <Box className={styles.header}>Gas</Box>
    <ReceiptBreakdownRow label="Gas Used" value={gasUsed || "Loading..."} />
    <ReceiptBreakdownRow label="Gas Price" value={gasPrice || "Loading..."} />
    <ReceiptBreakdownRow label="Gas Cost" value={cost || "Loading..."} />
  </Box>)
}
