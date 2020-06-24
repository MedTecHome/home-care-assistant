import React from 'react';
import { Grid, Paper, makeStyles, Box } from '@material-ui/core';
import DateFieldComponent from '../fields/DateFieldComponent';
import CustomTextFieldComponent from '../inputs/CustomTextFieldComponent';
import TimeFieldComponent from '../fields/TimeFieldComponent';
import SeverityFieldComponent from '../fields/SeverityFieldComponent';
import { validateOthersName, validateOthersSeverity } from './validateMedicalForms';
import TitleAndIconComponent from '../TitleAndIconComponent';

const useSyles = makeStyles({
  root: {
    padding: 15,
    borderRadius: 10,
    maxWidth: 450
  }
});

function OthersForms({ classStyle, testName = '' }) {
  const classes = useSyles();
  return (
    <Paper variant="outlined" className={classes.root}>
      <Box marginBottom={1}>
        <TitleAndIconComponent type="otherstest" alternativeTitle={`Prueba - (${testName})`} />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <CustomTextFieldComponent required label="Nombre" name="othersName" validate={validateOthersName} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <SeverityFieldComponent validate={validateOthersSeverity} />
        </Grid>
        <DateFieldComponent maxDate={Date.now()} classes={classStyle} name="othersDate" label="Dia" />
        <TimeFieldComponent maxDate={Date.now()} label="Hora" name="othersTime" classes={classStyle} />
        <Grid item xs={12}>
          <CustomTextFieldComponent rows={3} multiline label="Nota" name="othersNote" />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default OthersForms;
