import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import DateFieldComponent from '../fields/DateFieldComponent';
import TimeFieldComponent from '../fields/TimeFieldComponent';
import CustomTextFieldComponent from '../inputs/CustomTextFieldComponent';
import { validateDistance, validateSteps, validateTime2 } from './validateMedicalForms';

function ExercisesForm({ classStyle }) {
  return (
    <Paper variant="outlined" style={{ padding: 15, borderRadius: 10 }}>
      <Typography className={classStyle.titleForms} variant="subtitle1">
        Actividad física
      </Typography>
      <Grid item xs={12} container spacing={2}>
        <Grid item xs={4}>
          <CustomTextFieldComponent
            required
            type="number"
            label="Distancia"
            name="distance"
            validate={validateDistance}
          />
        </Grid>
        <Grid item xs={4}>
          <CustomTextFieldComponent required type="number" label="Tiempo" name="time" validate={validateTime2} />
        </Grid>
        <Grid item xs={4}>
          <CustomTextFieldComponent required type="number" label="Pasos" name="steps" validate={validateSteps} />
        </Grid>
        <DateFieldComponent classes={classStyle} name="exercisesDate" label="Dia" />
        <TimeFieldComponent label="Hora" name="exercisesTime" classes={classStyle} />
        <Grid item xs={12}>
          <CustomTextFieldComponent multiline rows={3} label="Nota" name="exercisesNote" />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ExercisesForm;
