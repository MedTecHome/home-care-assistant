import React from 'react';
import { useMediaQuery, useTheme, Grid, Paper, makeStyles } from '@material-ui/core';
import DateFieldComponent from '../fields/DateFieldComponent';
import TimeFieldComponent from '../fields/TimeFieldComponent';
import CustomTextFieldComponent from '../inputs/CustomTextFieldComponent';
import { validateGlucoseUnity, validateHorario, validateSugarConcentration } from './validateMedicalForms';
import GlucosaUnityFieldComponent from '../fields/GlucosaUnityFieldComponent';
import IntakeTimeFieldComponent from '../fields/IntakeTimeFieldComponent';
import TitleAndIconComponent from './TitleAndIconComponent';
import GenericSelectNomenclatorFieldComponent from '../fields/GenericSelectNomenclatorFieldComponent';

const useSyles = makeStyles({
  root: {
    padding: 15,
    borderRadius: 10,
    maxWidth: 450
  }
});

function GlucoseForm({ classStyle }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useSyles();

  return (
    <Paper variant="outlined" className={classes.root}>
      <TitleAndIconComponent type="glucose" />
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <CustomTextFieldComponent
            required
            type="number"
            label={`${matches ? 'Concent.' : 'Concentración'} de azúcar`}
            name="sugarConcentration"
            validate={validateSugarConcentration}
          />
        </Grid>
        <Grid item xs={5}>
          <GenericSelectNomenclatorFieldComponent
            label="Horario"
            name="shedule"
            validate={validateHorario}
            nomenclator="shedules"
          />
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
        <DateFieldComponent maxDate={Date.now()} classes={classStyle} name="glucoseDate" label="Dia" />
        <TimeFieldComponent maxDate={Date.now()} label="Hora" name="glucoseTime" classes={classStyle} />
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
