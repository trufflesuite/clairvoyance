import React, { useContext } from 'react';
import PropTypes from 'prop-types';

const Accreditation = ({ fetchVia, address }) => {
  const t = (a)=>{return a};
  const chainId = "0x1";


  const AccreditationLink = () => {
    return (
      <div>
          {t('transactionDecodingAccreditationVerified', [
            {fetchVia}
          ])}
      </div>
    );
  };

  return (
    <div className="accreditation">
      <div className="accreditation__icon">
        <i className="fa fa-info-circle" />
      </div>
      <div className="accreditation__info">
        <AccreditationLink />
      </div>
    </div>
  );
};

Accreditation.propTypes = {
  fetchVia: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
};

export default Accreditation;
