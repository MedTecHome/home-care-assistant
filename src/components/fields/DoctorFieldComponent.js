import { TextField } from 'mui-rff';
import React from 'react';

export default function DoctorFieldComponent({ classes }) {
  return (
    <TextField
      required
      className={classes.formControl}
      InputLabelProps={{ shrink: true }}
      size="small"
      label="Doctor:"
      variant="outlined"
      name="doctorId"
    />
  );
}
