import React  from 'react';
import {Text} from "@chakra-ui/react";
import PropTypes from 'prop-types';
import {Decoding} from "./decoding.component";
import styles from "./transaction-decoding.module.css";

export function TransactionDecoding({ decoding, label }: {decoding: any, label: string}) {
  
  return <div>
    <Text className={styles.header}>{label}</Text>
    {decoding ? <Decoding decoding={decoding} showSignature={true}/> : <Text>Loading...</Text>}
  </div>
}

TransactionDecoding.propTypes = {
  decoding: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired
};