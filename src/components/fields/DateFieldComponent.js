import React from 'react';
import { DatePicker } from 'mui-rff';
import MomentUtils from '@date-io/moment';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import { validateDate } from '../MedicalForms/validateMedicalForms';

export default function DateFieldComponent({ minDate, classes, name, label }) {
  return (
    <Grid item xs={6} sm={6} md={6}>
      <DatePicker
        required
        dateFunsUtils={MomentUtils}
        className={classes.formControl}
        size="small"
        variant="inline"
        inputVariant="outlined"
        label={label}
        autoOk
        placeholder={moment().format('DD/MM/YYYY')}
        format="DD/MM/YYYY"
        name={name}
        minDate={minDate}
        fieldProps={{
          validate: validateDate
        }}
      />
    </Grid>
  );
}
