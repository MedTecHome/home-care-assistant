import React from 'react';
import { TextField } from 'mui-rff';

export default function AddressFieldComponent({ classes }) {
  return (
    <TextField
      required
      className={classes.formControl}
      InputLabelProps={{
        shrink: true,
      }}
      size="small"
      label="Direccion:"
      variant="outlined"
      name="address"
    />
  );
}
