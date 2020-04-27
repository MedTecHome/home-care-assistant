import React from 'react';
import { TextField } from 'mui-rff';

function EmailFieldComponent({ classes, disabled }) {
  return (
    <TextField
      required
      disabled={disabled}
      type="email"
      name="email"
      className={classes.formControl}
      label="Correo"
      variant="outlined"
      InputLabelProps={{
        shrink: true,
      }}
      size="small"
    />
  );
}

export default EmailFieldComponent;
