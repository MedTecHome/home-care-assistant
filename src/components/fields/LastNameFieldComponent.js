import React from 'react';
import { TextField } from 'mui-rff';

export default function LastNameFieldComponent({ classes }) {
  return (
    <TextField
      required
      className={classes.formControl}
      InputLabelProps={{
        shrink: true,
      }}
      size="small"
      label="Apellidos:"
      variant="outlined"
      name="lastName"
    />
  );
}
