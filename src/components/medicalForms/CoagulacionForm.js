import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DateFieldComponent from '../fields/DateFieldComponent';
import TimeFieldComponent from '../fields/TimeFieldComponent';
import { validateINR } from './validateMedicalForms';
import CustomTextFieldComponent from '../inputs/CustomTextFieldComponent';

function CoagulacionForm({ classStyle }) {
  return (
    <div className={classStyle.paper}>
      <Typography className={classStyle.titleForms} variant="subtitle1">
        Coagulacion - INR:
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomTextFieldComponent type="number" label="INR:" name="INR" required validate={validateINR} />
        </Grid>
        <DateFieldComponent classes={classStyle} name="coagulationInrDate" label="Dia" />
        <TimeFieldComponent label="Hora" name="coagulationInrTime" classes={classStyle} />
        <Grid item xs={12}>
          <CustomTextFieldComponent type="number" label="Nota:" name="coagulationInrNota" required multiline rows={3} />
        </Grid>
      </Grid>
    </div>
  );
}

export default CoagulacionForm;
