import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { TextField } from 'mui-rff';
import Typography from '@material-ui/core/Typography';
import TimeFieldComponent from '../fields/TimeFieldComponent';
import DateFieldComponent from '../fields/DateFieldComponent';
import { validateDiastolica, validateHeartrate, validateSistolica } from './validateMedicalForms';

function PresionForm({ classStyle }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <div className={classStyle.paper}>
      <Typography className={classStyle.titleForms} variant="subtitle1">
        Presion
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <TextField
            className={classStyle.formControl}
            required
            size="small"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            type="number"
            label="Sistolica"
            name="sistolica"
            fieldProps={{
              validate: validateSistolica,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <TextField
            className={classStyle.formControl}
            required
            size="small"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            type="number"
            label="Diastolica"
            name="diastolica"
            fieldProps={{
              validate: validateDiastolica,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <TextField
            className={classStyle.formControl}
            required
            size="small"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            type="number"
            label={`${matches ? 'Frec.' : 'Frecuencia'} Cardiaca`}
            name="heartrate"
            fieldProps={{
              validate: validateHeartrate,
            }}
          />
        </Grid>
        <DateFieldComponent classes={classStyle} name="bloodPressureDate" label="Dia" />
        <TimeFieldComponent label="Hora" name="bloodPressureTime" classes={classStyle} />
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
            name="bloodPressureNote"
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default PresionForm;
