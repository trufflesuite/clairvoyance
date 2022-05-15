import React from 'react';
import {Flex, Box, Spacer, Tooltip} from '@chakra-ui/react'
import { InfoOutlineIcon } from '@chakra-ui/icons';

export default function TransactionBreakdownRow(props: any) {
  if (props.hideIfUndefined && props.value === undefined) {
    return null;
  }
  
  return <Flex>
    <Box flex="2" fontSize="sm" >
      {props.label} {createTooltip(props.tooltip)}
    </Box>
    <Spacer flex="1"></Spacer>
    <Box flex="2" fontSize="sm" >{props.value ?? "-"}</Box>
  </Flex>;
}

function createTooltip(tooltip: string) {
  if (tooltip === undefined) {
    return undefined;
  }
  return <Tooltip label={tooltip}><InfoOutlineIcon/></Tooltip>
}