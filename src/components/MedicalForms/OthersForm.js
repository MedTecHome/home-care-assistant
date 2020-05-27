import React, { useState } from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import DateFieldComponent from '../fields/DateFieldComponent';
import CustomTextFieldComponent from '../inputs/CustomTextFieldComponent';
import TimeFieldComponent from '../fields/TimeFieldComponent';
import SeverityFieldComponent from '../fields/SeverityFieldComponent';
import { validateOthersName, validateOthersSeverity } from './validateMedicalForms';

function OthersForms({ classStyle, testName = '' }) {
  return (
    <Paper variant="outlined" style={{ padding: 15, borderRadius: 10 }}>
      <Typography className={classStyle.titleForms} variant="subtitle1">
        {`Prueba - (${testName})`}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <CustomTextFieldComponent required label="Nombre" name="othersName" validate={validateOthersName} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <SeverityFieldComponent validate={validateOthersSeverity} />
        </Grid>
        <DateFieldComponent classes={classStyle} name="othersDate" label="Dia" />
        <TimeFieldComponent label="Hora" name="othersTime" classes={classStyle} />
        <Grid item xs={12}>
          <CustomTextFieldComponent rows={3} multiline label="Nota" name="othersNote" />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default OthersForms;
