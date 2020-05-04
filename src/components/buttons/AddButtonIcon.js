import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

function AddButtonIcon({ onClick, size }) {
  return (
    <IconButton color="primary" onClick={onClick} size="medium">
      <FontAwesomeIcon icon={faPlusCircle} fontSize={2} size={size} />
    </IconButton>
  );
}

export default AddButtonIcon;
