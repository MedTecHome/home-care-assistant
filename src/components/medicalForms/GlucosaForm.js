import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import DateFieldComponent from '../fields/DateFieldComponent';
import TimeFieldComponent from '../fields/TimeFieldComponent';
import { validateHorario, validateSugarConcentration } from './validateMedicalForms';
import CustomTextFieldComponent from '../inputs/CustomTextFieldComponent';
import CustomSelectFieldComponent from '../inputs/CustomSelectFieldComponent';

function GlucosaForm({ classStyle }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <div className={classStyle.paper}>
      <Typography className={classStyle.titleForms} variant="subtitle1">
        Glucosa
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomTextFieldComponent
            required
            label={`${matches ? 'Concent.' : 'Concentracion'} de azucar`}
            name="sugarConcentration"
            validate={validateSugarConcentration}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomSelectFieldComponent required source={[]} label="Horario" name="schedule" validate={validateHorario} />
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
    </div>
  );
}

export default GlucosaForm;
