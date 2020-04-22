import React from 'react';
import { TextField } from 'mui-rff';

export default function NameFieldComponent({ classes }) {
  return (
    <TextField
      required
      className={classes.formControl}
      InputLabelProps={{
        shrink: true,
      }}
      size="small"
      label="Nombre:"
      variant="outlined"
      name="name"
    />
  );
}
