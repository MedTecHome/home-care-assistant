import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNotesMedical } from '@fortawesome/free-solid-svg-icons';

function MedicalDetailButtonIcon({ onClick }) {
  return (
    <IconButton edge="end" aria-label="edit" onClick={onClick} color="primary" size="small">
      <FontAwesomeIcon icon={faNotesMedical} />
    </IconButton>
  );
}
export default MedicalDetailButtonIcon;
