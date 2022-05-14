import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from "../../../transaction-decoding.module.css";

const Address = ({
  checksummedRecipientAddress,
  onRecipientClick,
  addressOnly,
  recipientEns,
  recipientName,
}) => {
  const recipientToRender = checksummedRecipientAddress || 'newContract';

  return (
    <span className={styles.number}>{recipientToRender}</span>
  );
};

Address.propTypes = {
  checksummedRecipientAddress: PropTypes.string,
  recipientName: PropTypes.string,
  recipientEns: PropTypes.string,
  addressOnly: PropTypes.bool,
  onRecipientClick: PropTypes.func,
};

export default Address;
