import React from 'react';
import Button from '@material-ui/core/Button';

function AddButtonIcon({ onClick }) {
  return (
    <Button variant="contained" color="primary" onClick={onClick} size="small">
      Adicionar
    </Button>
  );
}

export default AddButtonIcon;
