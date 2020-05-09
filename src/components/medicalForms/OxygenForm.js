import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DateFieldComponent from '../fields/DateFieldComponent';
import TimeFieldComponent from '../fields/TimeFieldComponent';
import { validateHearbeat, validatePI, validateSpO2 } from './validateMedicalForms';
import CustomTextFieldComponent from '../inputs/CustomTextFieldComponent';

export default function OxygenForm({ classStyle }) {
  return (
    <div className={classStyle.paper}>
      <Typography className={classStyle.titleForms} variant="subtitle1">
        Oxigeno
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomTextFieldComponent required name="SpO2" label="SpO2:" validate={validateSpO2} />
        </Grid>
        <Grid item xs={12}>
          <CustomTextFieldComponent required name="heartbeat" label="Pulso:" validate={validateHearbeat} />
        </Grid>
        <Grid item xs={12}>
          <CustomTextFieldComponent required name="oxygenPI" label="PI(Indice perfusion):" validate={validatePI} />
        </Grid>
        <DateFieldComponent classes={classStyle} name="oxygenDate" label="Dia" />
        <TimeFieldComponent label="Hora" name="oxygenTime" classes={classStyle} />
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <CustomTextFieldComponent rows={3} multiline label="Nota" name="oxygenNote" />
        </Grid>
      </Grid>
    </div>
  );
}
