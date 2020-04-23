import React from 'react';
import { TextField } from 'mui-rff';

export default function HeightFieldComponent({ classes }) {
  return (
    <TextField
      required
      type="number"
      className={classes.formControl}
      InputLabelProps={{ shrink: true }}
      size="small"
      label="Estatura:"
      variant="outlined"
      name="height"
    />
  );
}
