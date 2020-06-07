import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

function EditButtonIcon({ onClick, buttonColor = 'primary', disabled = false }) {
  return (
    <IconButton color={buttonColor} onClick={onClick} size="small" disabled={disabled}>
      <FontAwesomeIcon icon={faEdit} />
    </IconButton>
  );
}
export default EditButtonIcon;
