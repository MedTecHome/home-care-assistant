import React from 'react';
import MomentUtils from '@date-io/moment';
import Grid from '@material-ui/core/Grid';
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { AccessTime } from '@material-ui/icons';
import { Field } from 'react-final-form';
import { validateTime } from '../MedicalForms/validateMedicalForms';

export default function TimeFieldComponent({ classes, name, label, maxDate }) {
  return (
    <Grid item xs={6} sm={6} md={6}>
      <Field name={name} validate={validateTime}>
        {({ input, meta }) => (
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <TimePicker
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
              maxDate={maxDate}
              inputVariant="outlined"
              placeholder="04:25 AM"
              InputProps={{
                endAdornment: <AccessTime htmlColor="#666" />
              }}
              helperText={!!meta.error && meta.visited && meta.touched ? meta.error : ''}
            />
          </MuiPickersUtilsProvider>
        )}
      </Field>
    </Grid>
  );
}
