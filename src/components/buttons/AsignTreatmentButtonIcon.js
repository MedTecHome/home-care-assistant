import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingMedical } from '@fortawesome/free-solid-svg-icons';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

function AsignTreatmentButtonIcon({ onClick }) {
  return (
    <Tooltip title="Asignar tratamiento">
      <IconButton onClick={onClick} size="small">
        <FontAwesomeIcon icon={faHandHoldingMedical} />
      </IconButton>
    </Tooltip>
  );
}

export default AsignTreatmentButtonIcon;
