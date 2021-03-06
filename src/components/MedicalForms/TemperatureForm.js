import React from 'react';
import { Grid, Paper, makeStyles, Box } from '@material-ui/core';
import DateFieldComponent from '../fields/DateFieldComponent';
import TimeFieldComponent from '../fields/TimeFieldComponent';
import CustomTextFieldComponent from '../inputs/CustomTextFieldComponent';
import { validateCelsiusDegree } from './validateMedicalForms';
import TitleAndIconComponent from '../TitleAndIconComponent';

const useStyles = makeStyles({
  root: {
    padding: 15,
    borderRadius: 10,
    maxWidth: 450
  }
});

function TemperatureForm({ classStyle }) {
  const classes = useStyles();
  return (
    <Paper variant="outlined" className={classes.root}>
      <Box marginBottom={1}>
        <TitleAndIconComponent type="temperature" />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomTextFieldComponent
            required
            label="Grados Celcius"
            name="celsiusDegree"
            validate={validateCelsiusDegree}
          />
        </Grid>
        <DateFieldComponent maxDate={Date.now()} classes={classStyle} name="temperatureDate" label="Dia" />
        <TimeFieldComponent maxDate={Date.now()} label="Hora" name="temperatureTime" classes={classStyle} />
        <Grid item xs={12}>
          <CustomTextFieldComponent multiline rows={3} label="Nota" name="temperatureNote" />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default TemperatureForm;
