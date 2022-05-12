import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copyToClipboard from 'copy-to-clipboard';

const Address = ({
  checksummedRecipientAddress,
  onRecipientClick,
  addressOnly,
  recipientEns,
  recipientName,
}) => {
  const t = (a) => {return a};
  const [showNicknamePopovers, setShowNicknamePopovers] = useState(false);

  const recipientToRender = checksummedRecipientAddress || t('newContract');

  return (
    <div
      className="tx-insight tx-insight-component tx-insight-component-address"
      onClick={() => {
        copyToClipboard(checksummedRecipientAddress);
        if (onRecipientClick) {
          onRecipientClick();
        }
      }}
    >
      <div className="tx-insight-component-address__sender-icon">
        Identicon
      </div>

      <div
        className="address__name"
        onClick={() => setShowNicknamePopovers(true)}
      >
        {recipientToRender}
      </div>
      {showNicknamePopovers ? (
        checksummedRecipientAddress
      ) : null}
    </div>
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
