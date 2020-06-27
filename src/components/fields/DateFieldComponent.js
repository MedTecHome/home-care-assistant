import React from 'react';
import { DatePicker } from 'mui-rff';
import MomentUtils from '@date-io/moment';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import { Today as TodayIcon } from '@material-ui/icons';
import { validateDate } from '../MedicalForms/validateMedicalForms';

export default function DateFieldComponent({ minDate, maxDate, classes, name, label }) {
  return (
    <Grid item xs={6} sm={6} md={6}>
      <DatePicker
        required
        dateFunsUtils={MomentUtils}
        className={classes.formControl}
        size="medium"
        variant="inline"
        inputVariant="outlined"
        label={label}
        autoOk
        placeholder={moment().format('DD/MM/YYYY')}
        format="DD/MM/YYYY"
        name={name}
        minDate={minDate}
        maxDate={maxDate}
        fieldProps={{
          validate: validateDate
        }}
        InputProps={{
          endAdornment: <TodayIcon htmlColor="#666" fontSize="small" />
        }}
      />
    </Grid>
  );
}
