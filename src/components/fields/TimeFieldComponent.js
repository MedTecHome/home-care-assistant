import React from 'react';
import { KeyboardTimePicker } from 'mui-rff';
import MomentUtils from '@date-io/moment';
import Grid from '@material-ui/core/Grid';

export default function TimeFieldComponent({ classes, name, label }) {
  return (
    <Grid item xs={6} sm={6} md={6}>
      <KeyboardTimePicker
        required
        dateFunsUtils={MomentUtils}
        className={classes.formControl}
        InputLabelProps={{ shrink: true }}
        size="small"
        variant="inline"
        label={label}
        autoOk
        inputVariant="outlined"
        name={name}
      />
    </Grid>
  );
}
