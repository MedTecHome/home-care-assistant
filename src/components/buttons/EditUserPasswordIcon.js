import React from 'react';
import { IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';

function EditUserPasswordIcon({ onClick, buttonColor = 'primary', disabled = false }) {
  return (
    <IconButton color={buttonColor} onClick={onClick} size="small" disabled={disabled}>
      <FontAwesomeIcon icon={faKey} />
    </IconButton>
  );
}

export default EditUserPasswordIcon;
