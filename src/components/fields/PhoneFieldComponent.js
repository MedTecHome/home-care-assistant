import React from 'react';
import { TextField } from 'mui-rff';

export default function PhoneFieldComponent({ classes }) {
  return (
    <TextField
      required
      type="number"
      className={classes.formControl}
      InputLabelProps={{
        shrink: true,
      }}
      size="small"
      label="Telefono:"
      variant="outlined"
      name="phone"
    />
  );
}
