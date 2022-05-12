import React, { useContext } from 'react';
import PropTypes from 'prop-types';

const CopyRawData = ({ data }) => {

  return (
    <div className="copy-raw-data">
      TOOLTIP
    </div>
  );
};

CopyRawData.propTypes = {
  data: PropTypes.string.isRequired,
};

export default CopyRawData;
