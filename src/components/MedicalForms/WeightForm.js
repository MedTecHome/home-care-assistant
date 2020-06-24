import React from 'react';
import { Grid, Paper, makeStyles, Box } from '@material-ui/core';
import DateFieldComponent from '../fields/DateFieldComponent';
import TimeFieldComponent from '../fields/TimeFieldComponent';
import CustomTextFieldComponent from '../inputs/CustomTextFieldComponent';
import { validateWeight } from './validateMedicalForms';
import TitleAndIconComponent from '../TitleAndIconComponent';

const useStyles = makeStyles({
  root: {
    padding: 15,
    borderRadius: 10,
    maxWidth: 450
  }
});

function WeightForm({ classStyle }) {
  const classes = useStyles();
  return (
    <Paper variant="outlined" className={classes.root}>
      <Box marginBottom={1}>
        <TitleAndIconComponent type="weight" />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomTextFieldComponent required type="number" label="Peso(kg)" name="weight" validate={validateWeight} />
        </Grid>
        <DateFieldComponent maxDate={Date.now()} classes={classStyle} name="weightDate" label="Día" />
        <TimeFieldComponent maxDate={Date.now()} label="Hora" name="weightTime" classes={classStyle} />
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <CustomTextFieldComponent rows={3} multiline label="Nota" name="weightNote" />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default WeightForm;
