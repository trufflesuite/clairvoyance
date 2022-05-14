import React from 'react';
import {Flex, Box, Spacer} from '@chakra-ui/react'

export default function ReceiptBreakdownRow(props: any) {
  return <Flex>
    <Box flex="2" fontSize="sm" >{props.label}</Box>
    <Spacer flex="1"></Spacer>
    <Box flex="2" fontSize="sm" >{props.value}</Box>
  </Flex>;
}