import React from 'react';
import Grid from '@material-ui/core/Grid';
import { TextField } from 'mui-rff';
import Typography from '@material-ui/core/Typography';
import DateFieldComponent from '../fields/DateFieldComponent';
import TimeFieldComponent from '../fields/TimeFieldComponent';

function PesoForm({ classStyle }) {
  return (
    <div className={classStyle.paper}>
      <Typography className={classStyle.titleForms} variant="subtitle1">
        Peso:
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            className={classStyle.formControl}
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            required
            type="number"
            label="Peso"
            name="weight"
          />
        </Grid>
        <DateFieldComponent classes={classStyle} name="weightDate" label="Dia" />
        <TimeFieldComponent label="Hora" name="weightTime" classes={classStyle} />
      </Grid>
    </div>
  );
}

export default PesoForm;
