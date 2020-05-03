import React from 'react';
import { KeyboardDatePicker } from 'mui-rff';
import MomentUtils from '@date-io/moment';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import { validateDate } from '../medicalForms/validateMedicalForms';

export default function DateFieldComponent({ classes, name, label }) {
  return (
    <Grid item xs={6} sm={6} md={6}>
      <KeyboardDatePicker
        required
        dateFunsUtils={MomentUtils}
        className={classes.formControl}
        InputLabelProps={{ shrink: true }}
        size="small"
        variant="inline"
        label={label}
        autoOk
        placeholder={moment().format('DD/MM/YYYY')}
        format="DD/MM/YYYY"
        inputVariant="outlined"
        name={name}
        fieldProps={{
          validate: validateDate,
        }}
      />
    </Grid>
  );
}
