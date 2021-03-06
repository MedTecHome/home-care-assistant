import React from 'react';
import { Grid, Paper, makeStyles, Box } from '@material-ui/core';
import DateFieldComponent from '../fields/DateFieldComponent';
import TimeFieldComponent from '../fields/TimeFieldComponent';
import CustomTextFieldComponent from '../inputs/CustomTextFieldComponent';
import { validateHearbeat, validatePI, validateSpO2 } from './validateMedicalForms';
import TitleAndIconComponent from '../TitleAndIconComponent';

const useSyles = makeStyles({
  root: {
    padding: 15,
    borderRadius: 10,
    maxWidth: 450
  }
});

export default function OxygenForm({ classStyle }) {
  const classes = useSyles();
  return (
    <Paper variant="outlined" className={classes.root}>
      <Box marginBottom={1}>
        <TitleAndIconComponent type="oxygen" />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomTextFieldComponent required name="SpO2" label="SpO2:" validate={validateSpO2} />
        </Grid>
        <Grid item xs={12}>
          <CustomTextFieldComponent required name="heartbeat" label="Pulso:" validate={validateHearbeat} />
        </Grid>
        <Grid item xs={12}>
          <CustomTextFieldComponent required name="oxygenPI" label="PI(Indice perfusión):" validate={validatePI} />
        </Grid>
        <DateFieldComponent maxDate={Date.now()} classes={classStyle} name="oxygenDate" label="Día" />
        <TimeFieldComponent maxDate={Date.now()} label="Hora" name="oxygenTime" classes={classStyle} />
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <CustomTextFieldComponent rows={3} multiline label="Nota" name="oxygenNote" />
        </Grid>
      </Grid>
    </Paper>
  );
}
