import React from 'react';
import { Grid, Paper, Typography, makeStyles } from '@material-ui/core';
import DateFieldComponent from '../fields/DateFieldComponent';
import TimeFieldComponent from '../fields/TimeFieldComponent';
import CustomTextFieldComponent from '../inputs/CustomTextFieldComponent';
import { validateCelsiusDegree } from './validateMedicalForms';

const useStyles = makeStyles({
  root: {
    padding: 15,
    borderRadius: 10
  }
});

function TemperatureForm({ classStyle }) {
  const classes = useStyles();
  return (
    <Paper variant="outlined" className={classes.root}>
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
    </Paper>
  );
}

export default TemperatureForm;
