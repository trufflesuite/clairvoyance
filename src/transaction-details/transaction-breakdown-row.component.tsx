import React from 'react';
import {Flex, Box, Spacer} from '@chakra-ui/react'

export default function TransactionBreakdownRow(props: any) {
  return <Flex>
    <Box flex="2">{props.label}</Box>
    <Spacer flex="1"></Spacer>
    <Box flex="2">{props.value}</Box>
  </Flex>;
}