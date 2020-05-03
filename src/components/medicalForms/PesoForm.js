import React from 'react';
import Grid from '@material-ui/core/Grid';
import { TextField } from 'mui-rff';
import Typography from '@material-ui/core/Typography';
import DateFieldComponent from '../fields/DateFieldComponent';
import TimeFieldComponent from '../fields/TimeFieldComponent';
import { validateWeight } from './validateMedicalForms';

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
            fieldProps={{
              validate: validateWeight,
            }}
          />
        </Grid>
        <DateFieldComponent classes={classStyle} name="weightDate" label="Dia" />
        <TimeFieldComponent label="Hora" name="weightTime" classes={classStyle} />
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
            name="weightNote"
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default PesoForm;
