import React from 'react';
import { TextField } from 'mui-rff';

function EmailFieldComponent({ classes }) {
  return (
    <TextField
      required
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
