import React from 'react';
import Typography from '@material-ui/core/Typography';
import { TextField } from 'mui-rff';
import Grid from '@material-ui/core/Grid';
import DateFieldComponent from '../fields/DateFieldComponent';
import TimeFieldComponent from '../fields/TimeFieldComponent';
import { validateHearbeat, validatePI, validateSpO2 } from './validateMedicalForms';

export default function OxygenForm({ classStyle }) {
  return (
    <div className={classStyle.paper}>
      <Typography className={classStyle.titleForms} variant="subtitle1">
        Saturacion oxigeno
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            name="SpO2"
            label="SpO2:"
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            fieldProps={{
              validate: validateSpO2,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            name="heartbeat"
            label="Pulso:"
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            fieldProps={{
              validate: validateHearbeat,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            name="oxygenPI"
            label="PI(Indice perfusion):"
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            fieldProps={{
              validate: validatePI,
            }}
          />
        </Grid>
        <DateFieldComponent classes={classStyle} name="oxygenDate" label="Dia" />
        <TimeFieldComponent label="Hora" name="oxygenTime" classes={classStyle} />
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <TextField
            className={classStyle.formControl}
            size="small"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            rows={3}
            multiline
            label="Nota"
            name="oxygenNote"
          />
        </Grid>
      </Grid>
    </div>
  );
}
