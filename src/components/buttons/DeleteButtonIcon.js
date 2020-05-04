import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function DeleteButtonIcon({ onClick }) {
  return (
    <IconButton color="secondary" onClick={onClick} size="small">
      <FontAwesomeIcon icon={faTrash} />
    </IconButton>
  );
}
export default DeleteButtonIcon;
