import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DateFieldComponent from '../fields/DateFieldComponent';
import TimeFieldComponent from '../fields/TimeFieldComponent';
import { validateDistance, validateSteps, validateTime2 } from './validateMedicalForms';
import CustomTextFieldComponent from '../inputs/CustomTextFieldComponent';

function ExercisesForm({ classStyle }) {
  return (
    <div>
      <Typography className={classStyle.titleForms} variant="subtitle1">
        Actividad fisica
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
    </div>
  );
}

export default ExercisesForm;
