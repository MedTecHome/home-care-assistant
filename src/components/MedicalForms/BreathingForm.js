import React from 'react';
import { Grid, Paper, makeStyles, Box } from '@material-ui/core';
import DateFieldComponent from '../fields/DateFieldComponent';
import TimeFieldComponent from '../fields/TimeFieldComponent';
import CustomTextFieldComponent from '../inputs/CustomTextFieldComponent';
import { validateBreathingFrecuency, validateEtCO, validatePI } from './validateMedicalForms';
import TitleAndIconComponent from '../TitleAndIconComponent';

const useStyles = makeStyles({
  root: {
    padding: 15,
    borderRadius: 10,
    maxWidth: 450
  }
});

function BreathingForm({ classStyle }) {
  const classes = useStyles();
  return (
    <Paper variant="outlined" className={classes.root}>
      <Box marginBottom={1}>
        <TitleAndIconComponent type="breathing" />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomTextFieldComponent
            required
            name="EtCO"
            type="number"
            label="EtCO2:"
            placeholder="0 - 100 mmHg"
            validate={validateEtCO}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextFieldComponent
            required
            name="breathingFrecuency"
            type="number"
            label="Frecuencia Respiratoria:"
            placeholder="20RPM"
            validate={validateBreathingFrecuency}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextFieldComponent
            required
            name="breathingPI"
            type="number"
            label="Indice Perfusión:"
            placeholder="5.5 %"
            validate={validatePI}
          />
        </Grid>
        <DateFieldComponent maxDate={Date.now()} classes={classStyle} name="breathingtDate" label="Dia" />
        <TimeFieldComponent maxDate={Date.now()} label="Hora" name="breathingTime" classes={classStyle} />
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <CustomTextFieldComponent rows={3} multiline label="Nota" name="breathingNote" />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default BreathingForm;
