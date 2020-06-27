import React from 'react';
import MomentUtils from '@date-io/moment';
import Grid from '@material-ui/core/Grid';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import { Today as TodayIcon } from '@material-ui/icons';
import { Field } from 'react-final-form';
import { validateDate } from '../MedicalForms/validateMedicalForms';

export default function DateFieldComponent({ minDate, maxDate, classes, name, label }) {
  return (
    <Grid item xs={6} sm={6} md={6}>
      <Field name={name} validate={validateDate}>
        {({ input, meta }) => (
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...input}
              value={['', undefined].includes(input.value) ? null : input.value}
              error={!!meta.error && meta.visited && meta.touched}
              size="medium"
              required
              cancelLabel="Cancelar"
              okLabel="Aceptar"
              className={classes.formControl}
              label={label}
              minDate={minDate}
              maxDate={maxDate}
              inputVariant="outlined"
              format="DD/MM/YYYY"
              placeholder={moment().format('DD/MM/YYYY')}
              InputProps={{
                endAdornment: <TodayIcon htmlColor="#666" fontSize="small" />
              }}
              helperText={!!meta.error && meta.visited && meta.touched ? meta.error : ''}
            />
          </MuiPickersUtilsProvider>
        )}
      </Field>
    </Grid>
  );
}
