import React from 'react';
import Grid from '@material-ui/core/Grid';
import { TextField } from 'mui-rff';
import Typography from '@material-ui/core/Typography';
import DateFieldComponent from '../fields/DateFieldComponent';
import TimeFieldComponent from '../fields/TimeFieldComponent';
import { validateCelsiusDegree } from './validateMedicalForms';

function TemperaturaForm({ classStyle }) {
  return (
    <div className={classStyle.paper}>
      <Typography className={classStyle.titleForms} variant="subtitle1">
        Temperatura:
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            className={classStyle.formControl}
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            label="Grados Celcius"
            name="celsiusDegree"
            fieldProps={{
              validate: validateCelsiusDegree,
            }}
          />
        </Grid>
        <DateFieldComponent classes={classStyle} name="temperatureDate" label="Dia" />
        <TimeFieldComponent label="Hora" name="temperatureTime" classes={classStyle} />
        <Grid item xs={12}>
          <TextField
            className={classStyle.formControl}
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            multiline
            rows={3}
            label="Nota"
            name="temperatureNote"
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default TemperaturaForm;
