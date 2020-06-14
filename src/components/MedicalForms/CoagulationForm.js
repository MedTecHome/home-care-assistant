import React from 'react';
import { Grid, Paper, makeStyles } from '@material-ui/core';
import DateFieldComponent from '../fields/DateFieldComponent';
import TimeFieldComponent from '../fields/TimeFieldComponent';
import CustomTextFieldComponent from '../inputs/CustomTextFieldComponent';
import { validateINR } from './validateMedicalForms';
import TitleAndIconComponent from './TitleAndIconComponent';

const useSyles = makeStyles({
  root: {
    padding: 15,
    borderRadius: 10
  }
});

function CoagulationForm({ classStyle }) {
  const classes = useSyles();
  return (
    <Paper variant="outlined" className={classes.root}>
      <TitleAndIconComponent type="inr" classes={classStyle} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomTextFieldComponent type="number" label="INR:" name="INR" required validate={validateINR} />
        </Grid>
        <DateFieldComponent maxDate={Date.now()} classes={classStyle} name="coagulationInrDate" label="Día" />
        <TimeFieldComponent maxDate={Date.now()} label="Hora" name="coagulationInrTime" classes={classStyle} />
        <Grid item xs={12}>
          <CustomTextFieldComponent type="number" label="Nota:" name="coagulationInrNote" multiline rows={3} />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CoagulationForm;
