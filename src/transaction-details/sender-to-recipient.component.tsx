import { ArrowRightIcon } from "@chakra-ui/icons";
import styles from "./transaction-details.module.css";
import {Flex, Box, Spacer} from '@chakra-ui/react'

export default function SenderToRecipient(props: {from:string, to:string}) {  
  return <div>
    <Flex className={styles.header}>
      <Box flex="2">From</Box>
      <Spacer flex="1"></Spacer>
      <Box flex="2">To</Box>
    </Flex>
    <Flex className={styles.parties}>
      <Box flex="2" fontSize="sm" >{props.from}</Box>
      <Box flex="1" className={styles.icon}><ArrowRightIcon/></Box>
      <Box flex="2" fontSize="sm" >{props.to}</Box>
    </Flex>
  </div>
}//