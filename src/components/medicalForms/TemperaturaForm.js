import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DateFieldComponent from '../fields/DateFieldComponent';
import TimeFieldComponent from '../fields/TimeFieldComponent';
import { validateCelsiusDegree } from './validateMedicalForms';
import CustomTextFieldComponent from '../inputs/CustomTextFieldComponent';

function TemperaturaForm({ classStyle }) {
  return (
    <div className={classStyle.paper}>
      <Typography className={classStyle.titleForms} variant="subtitle1">
        Temperatura:
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomTextFieldComponent
            required
            label="Grados Celcius"
            name="celsiusDegree"
            validate={validateCelsiusDegree}
          />
        </Grid>
        <DateFieldComponent classes={classStyle} name="temperatureDate" label="Dia" />
        <TimeFieldComponent label="Hora" name="temperatureTime" classes={classStyle} />
        <Grid item xs={12}>
          <CustomTextFieldComponent multiline rows={3} label="Nota" name="temperatureNote" />
        </Grid>
      </Grid>
    </div>
  );
}

export default TemperaturaForm;
