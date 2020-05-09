import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import DateFieldComponent from '../fields/DateFieldComponent';
import TimeFieldComponent from '../fields/TimeFieldComponent';
import CustomTextFieldComponent from '../inputs/CustomTextFieldComponent';
import { validateWeight } from './validateMedicalForms';

function WeightForm({ classStyle }) {
  return (
    <Paper variant="outlined" style={{ padding: 15, borderRadius: 10 }}>
      <Typography className={classStyle.titleForms} variant="subtitle1">
        Peso
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomTextFieldComponent required type="number" label="Peso" name="weight" validate={validateWeight} />
        </Grid>
        <DateFieldComponent classes={classStyle} name="weightDate" label="Día" />
        <TimeFieldComponent label="Hora" name="weightTime" classes={classStyle} />
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <CustomTextFieldComponent rows={3} multiline label="Nota" name="weightNote" />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default WeightForm;
