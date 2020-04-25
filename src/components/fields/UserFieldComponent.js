import { TextField } from 'mui-rff';
import React from 'react';

export default function UserFieldComponent({ classes, disabled }) {
  return (
    <TextField
      disabled={disabled}
      className={classes.formControl}
      InputLabelProps={{ shrink: true }}
      size="small"
      label="Usuario:"
      variant="outlined"
      name="user"
    />
  );
}
