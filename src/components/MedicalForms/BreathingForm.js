import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import DateFieldComponent from '../fields/DateFieldComponent';
import TimeFieldComponent from '../fields/TimeFieldComponent';
import CustomTextFieldComponent from '../inputs/CustomTextFieldComponent';
import { validateBreathingFrecuency, validateEtCO, validatePI } from './validateMedicalForms';

function BreathingForm({ classStyle }) {
  return (
    <Paper variant="outlined" style={{ padding: 15, borderRadius: 10 }}>
      <Typography className={classStyle.titleForms} variant="subtitle1">
        Respiración (Capnometría)
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomTextFieldComponent
            required
            name="EtCO"
            type="number"
            label="EtCO2:"
            placeholder="0 - 100 mmHg"
            validate={validateEtCO}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextFieldComponent
            required
            name="breathingFrecuency"
            type="number"
            label="Frecuencia Respiratoria:"
            placeholder="20RPM"
            validate={validateBreathingFrecuency}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextFieldComponent
            required
            name="breathingPI"
            type="number"
            label="Indice Perfusión:"
            placeholder="5.5 %"
            validate={validatePI}
          />
        </Grid>
        <DateFieldComponent classes={classStyle} name="breathingtDate" label="Dia" />
        <TimeFieldComponent label="Hora" name="breathingTime" classes={classStyle} />
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <CustomTextFieldComponent rows={3} multiline label="Nota" name="breathingNote" />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default BreathingForm;
