import React from 'react';
import { useMediaQuery, useTheme, Grid, Typography, Paper } from '@material-ui/core';
import TimeFieldComponent from '../fields/TimeFieldComponent';
import DateFieldComponent from '../fields/DateFieldComponent';
import CustomTextFieldComponent from '../inputs/CustomTextFieldComponent';
import { validateHeartrate } from './validateMedicalForms';

function HeartrateForm({ classStyle }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Paper variant="outlined" style={{ padding: 15, borderRadius: 10 }}>
      <Typography className={classStyle.titleForms} variant="subtitle1">
        Frecuencia Cardiaca
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <CustomTextFieldComponent
            required
            type="number"
            label={`${matches ? 'Frec.' : 'Frecuencia'} Cardíaca`}
            name="heartrate"
            validate={validateHeartrate}
          />
        </Grid>
        <DateFieldComponent classes={classStyle} name="heartrateDate" label="Dia" />
        <TimeFieldComponent label="Hora" name="heartrateTime" classes={classStyle} />
        <Grid item xs={12}>
          <CustomTextFieldComponent rows={3} multiline label="Nota" name="heartrateNote" />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default HeartrateForm;
