import React from 'react';
import Button from '@material-ui/core/Button';
import { Add as AddIcon } from '@material-ui/icons';

function AddButtonIcon({ onClick }) {
  return (
    <Button variant="contained" color="primary" onClick={onClick} size="small">
      <AddIcon />
      Adicionar
    </Button>
  );
}

export default AddButtonIcon;
