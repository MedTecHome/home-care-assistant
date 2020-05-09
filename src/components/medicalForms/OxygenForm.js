import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import DateFieldComponent from '../fields/DateFieldComponent';
import TimeFieldComponent from '../fields/TimeFieldComponent';
import CustomTextFieldComponent from '../inputs/CustomTextFieldComponent';
import { validateHearbeat, validatePI, validateSpO2 } from './validateMedicalForms';

export default function OxygenForm({ classStyle }) {
  return (
    <Paper variant="outlined" style={{ padding: 15, borderRadius: 10 }}>
      <Typography className={classStyle.titleForms} variant="subtitle1">
        Oxígeno
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomTextFieldComponent required name="SpO2" label="SpO2:" validate={validateSpO2} />
        </Grid>
        <Grid item xs={12}>
          <CustomTextFieldComponent required name="heartbeat" label="Pulso:" validate={validateHearbeat} />
        </Grid>
        <Grid item xs={12}>
          <CustomTextFieldComponent required name="oxygenPI" label="PI(Indice perfusión):" validate={validatePI} />
        </Grid>
        <DateFieldComponent classes={classStyle} name="oxygenDate" label="Día" />
        <TimeFieldComponent label="Hora" name="oxygenTime" classes={classStyle} />
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <CustomTextFieldComponent rows={3} multiline label="Nota" name="oxygenNote" />
        </Grid>
      </Grid>
    </Paper>
  );
}
