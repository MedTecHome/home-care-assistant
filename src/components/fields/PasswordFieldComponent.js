import React from 'react';
import { TextField } from 'mui-rff';

function PasswordFieldComponent({ classes }) {
  return (
    <TextField
      name="password"
      className={classes.formControl}
      type="password"
      label="Contraseña"
      variant="outlined"
      size="medium"
      InputLabelProps={{
        shrink: true
      }}
    />
  );
}

export default PasswordFieldComponent;
