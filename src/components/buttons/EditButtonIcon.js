import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

function EditButtonIcon({ onClick }) {
  return (
    <IconButton color="primary" onClick={onClick} size="small">
      <FontAwesomeIcon icon={faEdit} />
    </IconButton>
  );
}
export default EditButtonIcon;
