import React from 'react';
import { Grid, Paper, makeStyles } from '@material-ui/core';
import DateFieldComponent from '../fields/DateFieldComponent';
import TimeFieldComponent from '../fields/TimeFieldComponent';
import CustomTextFieldComponent from '../inputs/CustomTextFieldComponent';
import { validateDistance, validateSteps, validateTime2 } from './validateMedicalForms';
import TitleAndIconComponent from './TitleAndIconComponent';

const useSyles = makeStyles({
  root: {
    padding: 15,
    borderRadius: 10
  }
});

function ExercisesForm({ classStyle }) {
  const classes = useSyles();
  return (
    <Paper variant="outlined" className={classes.root}>
      <TitleAndIconComponent type="exercises" />
      <Grid item xs={12} container spacing={2}>
        <Grid item xs={4}>
          <CustomTextFieldComponent
            required
            type="number"
            label="Distancia(m)"
            name="distance"
            validate={validateDistance}
          />
        </Grid>
        <Grid item xs={4}>
          <CustomTextFieldComponent required type="number" label="Tiempo(min)" name="time" validate={validateTime2} />
        </Grid>
        <Grid item xs={4}>
          <CustomTextFieldComponent required type="number" label="Pasos" name="steps" validate={validateSteps} />
        </Grid>
        <DateFieldComponent maxDate={Date.now()} classes={classStyle} name="exercisesDate" label="Dia" />
        <TimeFieldComponent maxDate={Date.now()} label="Hora" name="exercisesTime" classes={classStyle} />
        <Grid item xs={12}>
          <CustomTextFieldComponent multiline rows={3} label="Nota" name="exercisesNote" />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ExercisesForm;
