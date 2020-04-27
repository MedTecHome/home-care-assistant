import React from 'react';
import Typography from '@material-ui/core/Typography';
import { TextField } from 'mui-rff';
import Grid from '@material-ui/core/Grid';

export default function PulsoForm({ classStyle }) {
  return (
    <div className={classStyle.paper}>
      <Typography className={classStyle.titleForms} variant="subtitle1">
        Oxymetria Pulso (SpO2)
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            name="heartbeatSpO2"
            label="SpO2:"
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            name="heartbeatHeartbeat"
            label="Pulso:"
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            name="heartbeatPI"
            label="PI(Indice perfusion):"
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
