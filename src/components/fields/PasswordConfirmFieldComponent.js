import React from 'react';
import { TextField } from 'mui-rff';

function PasswordConfirmFieldComponent({ classes }) {
  return (
    <TextField
      name="passwordConfirm"
      className={classes.formControl}
      type="password"
      label="Confirmar Contraseña"
      variant="outlined"
      size="medium"
      InputLabelProps={{
        shrink: true
      }}
    />
  );
}

export default PasswordConfirmFieldComponent;
