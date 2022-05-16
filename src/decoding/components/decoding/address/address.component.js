import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from "../../../transaction-decoding.module.css";
import { NetworkContext } from 'src/contexts/network.context';
import { useEtherscanAddressUrl } from '../../../../clairvoyance/hooks/useEtherscan';

const Address = ({
  checksummedRecipientAddress,
  onRecipientClick,
  addressOnly,
  recipientEns,
  recipientName,
}) => {
  const [networkState, _] = React.useContext(NetworkContext);
  const recipientToRender = checksummedRecipientAddress || 'newContract';
  const etherscanUrl = useEtherscanAddressUrl(networkState.networkId, recipientToRender);

  return etherscanUrl ?
  <a href={etherscanUrl} className={styles.number} target="_blank">{recipientToRender}</a>
    :
    <span className={styles.number}>{recipientToRender}</span>
  ;
};

Address.propTypes = {
  checksummedRecipientAddress: PropTypes.string,
  recipientName: PropTypes.string,
  recipientEns: PropTypes.string,
  addressOnly: PropTypes.bool,
  onRecipientClick: PropTypes.func,
};

export default Address;
