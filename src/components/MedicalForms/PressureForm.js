import React from 'react';
import { useMediaQuery, useTheme, Grid, Paper, makeStyles, Box } from '@material-ui/core';
import TimeFieldComponent from '../fields/TimeFieldComponent';
import DateFieldComponent from '../fields/DateFieldComponent';
import CustomTextFieldComponent from '../inputs/CustomTextFieldComponent';
import { validateDiastolica, validateHeartrate, validateSistolica } from './validateMedicalForms';
import TitleAndIconComponent from '../TitleAndIconComponent';

const useStyles = makeStyles({
  root: {
    padding: 15,
    borderRadius: 10,
    maxWidth: 450
  }
});

function PressureForm({ classStyle }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles();

  return (
    <Paper variant="outlined" className={classes.root}>
      <Box marginBottom={1}>
        <TitleAndIconComponent type="pressure" />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <CustomTextFieldComponent
            required
            type="number"
            label="Sistólica"
            name="sistolica"
            validate={validateSistolica}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <CustomTextFieldComponent
            required
            type="number"
            label="Diastólica"
            name="diastolica"
            validate={validateDiastolica}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <CustomTextFieldComponent
            required
            type="number"
            label={`${matches ? 'Frec.' : 'Frecuencia'} Cardíaca`}
            name="bloodPressureHeartrate"
            validate={validateHeartrate}
          />
        </Grid>
        <DateFieldComponent maxDate={Date.now()} classes={classStyle} name="bloodPressureDate" label="Dia" />
        <TimeFieldComponent maxDate={Date.now()} label="Hora" name="bloodPressureTime" classes={classStyle} />
        <Grid item xs={12}>
          <CustomTextFieldComponent rows={3} multiline label="Nota" name="bloodPressureNote" />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default PressureForm;
