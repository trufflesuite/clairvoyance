import React from 'react';
import * as Chakra from '@chakra-ui/react';
import { formatCurrency } from 'src/utils/utils';
import { MAINNET_NETWORK_ID, NETWORK_TO_NAME_MAP } from 'src/utils/constants';


export function BalanceSummary({ receipt, balances, options }: any) {

  const networkId = options.options.chain.networkId;
  const networkName = NETWORK_TO_NAME_MAP[networkId];
  const tokenName = networkId === MAINNET_NETWORK_ID ? "Eth": `${networkName}Eth`;
  const from = receipt?.from;
  const to = receipt?.to || receipt?.contractAddress || null;
  let fromDiff, toDiff;
  if(balances) {
    fromDiff = parseInt(balances.fromEndBalance) - parseInt(balances.fromStartBalance);
    if(to) {
      toDiff = parseInt(balances.toEndBalance) - parseInt(balances.toStartBalance);
    }
  }

  const values = {
    fromStartBalance: balances ? formatCurrency(parseInt(balances.fromStartBalance), tokenName) : "Loading...",
    fromEndBalance: balances ? formatCurrency(parseInt(balances.fromEndBalance), tokenName) : "Loading...",
    toStartBalance: balances ? formatCurrency(parseInt(balances.toStartBalance), tokenName) : "Loading...",
    toEndBalance: balances ? formatCurrency(parseInt(balances.toEndBalance), tokenName) : "Loading...",
    fromDiff: fromDiff != null ? formatCurrency(fromDiff, tokenName) : "Loading...",
    toDiff: toDiff != null ? formatCurrency(toDiff, tokenName) : "Loading..."
  }
  
  return (
    <Chakra.TableContainer>
    <Chakra.Table variant='simple'>
      <Chakra.Thead>
        <Chakra.Tr>
          <Chakra.Th></Chakra.Th>
          <Chakra.Th>Sender</Chakra.Th>
          <Chakra.Th>Receiver</Chakra.Th>
        </Chakra.Tr>
      </Chakra.Thead>
      <Chakra.Tbody>
        <Chakra.Tr>
          <Chakra.Th>Address</Chakra.Th>
          <Chakra.Th>{from || "Loading..."}</Chakra.Th>
          <Chakra.Th>{to || "Loading..."}</Chakra.Th>
        </Chakra.Tr>
        <Chakra.Tr>
          <Chakra.Th>Start Balance</Chakra.Th>
          <Chakra.Td>{values.fromStartBalance || "Loading..."}</Chakra.Td>
          <Chakra.Td>{values.toStartBalance || "Loading..."}</Chakra.Td>
        </Chakra.Tr>
        <Chakra.Tr>
          <Chakra.Th>End Balance</Chakra.Th>
          <Chakra.Td>{values.fromEndBalance || "Loading..."}</Chakra.Td>
          <Chakra.Td>{values.toEndBalance || "Loading..."}</Chakra.Td>
        </Chakra.Tr>
        <Chakra.Tr>
          <Chakra.Th>Diff</Chakra.Th>
          <Chakra.Td>{values.fromDiff || "Loading..."}</Chakra.Td>
          <Chakra.Td>{values.toDiff || "Loading..."}</Chakra.Td>
        </Chakra.Tr>
      </Chakra.Tbody>
    </Chakra.Table>
  </Chakra.TableContainer>
    )
}
