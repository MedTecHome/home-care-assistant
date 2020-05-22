import React from 'react';
import { useMediaQuery, useTheme, Grid, Typography, Paper } from '@material-ui/core';
import DateFieldComponent from '../fields/DateFieldComponent';
import TimeFieldComponent from '../fields/TimeFieldComponent';
import CustomTextFieldComponent from '../inputs/CustomTextFieldComponent';
import SheduleFieldComponent from '../fields/SheduleFieldComponent';
import { validateGlucoseUnity, validateHorario, validateSugarConcentration } from './validateMedicalForms';
import GlucosaUnityFieldComponent from '../fields/GlucosaUnityFieldComponent';
import IntakeTimeFieldComponent from '../fields/IntakeTimeFieldComponent';

function GlucoseForm({ classStyle }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Paper variant="outlined" style={{ padding: 15, borderRadius: 10 }}>
      <Typography className={classStyle.titleForms} variant="subtitle1">
        Glucosa
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <CustomTextFieldComponent
            required
            type="number"
            label={`${matches ? 'Concent.' : 'Concentración'} de azucar`}
            name="sugarConcentration"
            validate={validateSugarConcentration}
          />
        </Grid>
        <Grid item xs={5}>
          <SheduleFieldComponent label="Horario" name="shedule" validate={validateHorario} />
        </Grid>
        <Grid item xs={12}>
          <IntakeTimeFieldComponent label="Momento ingesta" name="intakeTime" />
        </Grid>
        <Grid item xs={12}>
          <GlucosaUnityFieldComponent required namee="glucoseUnity" validate={validateGlucoseUnity} />
        </Grid>
        <Grid item xs={12}>
          <CustomTextFieldComponent label="HbA1c" name="hba1c" />
        </Grid>
        <Grid item xs={12}>
          <CustomTextFieldComponent label="Insulina(comida)" name="insulinaFood" />
        </Grid>
        <Grid item xs={12}>
          <CustomTextFieldComponent label="Basal" name="basal" />
        </Grid>
        <Grid item xs={12}>
          <CustomTextFieldComponent label="Unidad Pan" name="breadUnity" />
        </Grid>
        <DateFieldComponent classes={classStyle} name="glucoseDate" label="Dia" />
        <TimeFieldComponent label="Hora" name="glucoseTime" classes={classStyle} />
        <Grid item xs={12}>
          <CustomTextFieldComponent
            className={classStyle.formControl}
            multiline
            rows={3}
            label="Nota"
            name="glucoseNote"
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default GlucoseForm;
