import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { TextField } from 'mui-rff';
import DateFieldComponent from '../fields/DateFieldComponent';
import TimeFieldComponent from '../fields/TimeFieldComponent';
import { validateINR } from './validateMedicalForms';
// import { useFormContext } from 'react-hook-form';

function CoagulacionForm({ classStyle }) {
  // const { register, errors } = useFormContext();
  return (
    <div className={classStyle.paper}>
      <Typography className={classStyle.titleForms} variant="subtitle1">
        Coagulacion - INR:
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            className={classStyle.formControl}
            type="number"
            label="INR:"
            name="INR"
            required
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            fieldProps={{
              validate: validateINR,
            }}
          />
        </Grid>
        <DateFieldComponent classes={classStyle} name="coagulationInrDate" label="Dia" />
        <TimeFieldComponent label="Hora" name="coagulationInrTime" classes={classStyle} />
        <Grid item xs={12}>
          <TextField
            className={classStyle.formControl}
            type="number"
            label="Nota:"
            name="coagulationInrNota"
            required
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            multiline
            rows={3}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default CoagulacionForm;
