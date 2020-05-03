import React from 'react';
import { TextField } from 'mui-rff';

export default function HeightFieldComponent({ classes, validate }) {
  return (
    <TextField
      required
      className={classes.formControl}
      InputLabelProps={{ shrink: true }}
      size="small"
      label="Estatura:"
      variant="outlined"
      name="height"
      fieldProps={{
        validate,
      }}
    />
  );
}
