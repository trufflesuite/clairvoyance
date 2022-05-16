import { ArrowRightIcon } from "@chakra-ui/icons";
import styles from "./transaction-details.module.css";
import {Flex, Box, Spacer} from '@chakra-ui/react'
import React from "react";
import { NetworkContext } from "../contexts/network.context"
import { useEtherscanAddressUrl } from '../clairvoyance/hooks/useEtherscan';

export default function SenderToRecipient(props: {from:string, to:string}) {  
  const [networkState, _] = React.useContext(NetworkContext);

  const senderEtherscanUrl = useEtherscanAddressUrl(networkState.networkId, props.from),
        recipientEtherscanUrl = useEtherscanAddressUrl(networkState.networkId, props.from);

  return <div>
    <Flex className={styles.header}>
      <Box flex="2">From</Box>
      <Spacer flex="1"></Spacer>
      <Box flex="2">To</Box>
    </Flex>
    <Flex className={styles.parties}>
      <Box flex="2" fontSize="sm" ><a href={senderEtherscanUrl} target="_blank" className={styles.etherscanLink}>{props.from}</a></Box>
      <Box flex="1" className={styles.icon}><ArrowRightIcon/></Box>
      <Box flex="2" fontSize="sm" ><a href={recipientEtherscanUrl} target="_blank" className={styles.etherscanLink}>{props.to}</a></Box>
    </Flex>
  </div>
}//