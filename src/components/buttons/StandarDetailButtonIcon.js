import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

function StandarDetailButtonIcon({ onClick }) {
  return (
    <IconButton color="primary" onClick={onClick} size="small">
      <FontAwesomeIcon icon={faInfoCircle} />
    </IconButton>
  );
}

export default StandarDetailButtonIcon;
