import React from 'react';
import { KeyboardTimePicker } from 'mui-rff';
import MomentUtils from '@date-io/moment';
import Grid from '@material-ui/core/Grid';
import { validateTime } from '../MedicalForms/validateMedicalForms';

export default function TimeFieldComponent({ classes, name, label, maxDate }) {
  return (
    <Grid item xs={6} sm={6} md={6}>
      <KeyboardTimePicker
        required
        dateFunsUtils={MomentUtils}
        className={classes.formControl}
        size="medium"
        variant="inline"
        maxDate={maxDate}
        inputVariant="outlined"
        label={label}
        autoOk
        placeholder="04:25 AM"
        name={name}
        fieldProps={{
          validate: validateTime
        }}
      />
    </Grid>
  );
}
