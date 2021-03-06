import React from 'react';
import { useMediaQuery, useTheme, Grid, Paper, makeStyles, Box } from '@material-ui/core';
import TimeFieldComponent from '../fields/TimeFieldComponent';
import DateFieldComponent from '../fields/DateFieldComponent';
import CustomTextFieldComponent from '../inputs/CustomTextFieldComponent';
import { validateHeartrate } from './validateMedicalForms';
import TitleAndIconComponent from '../TitleAndIconComponent';

const useSyles = makeStyles({
  root: {
    padding: 15,
    borderRadius: 10,
    maxWidth: 450
  }
});

function HeartrateForm({ classStyle }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useSyles();

  return (
    <Paper variant="outlined" className={classes.root}>
      <Box marginBottom={1}>
        <TitleAndIconComponent type="heartrate" />
      </Box>
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
        <DateFieldComponent maxDate={Date.now()} classes={classStyle} name="heartrateDate" label="Dia" />
        <TimeFieldComponent maxDate={Date.now()} label="Hora" name="heartrateTime" classes={classStyle} />
        <Grid item xs={12}>
          <CustomTextFieldComponent rows={3} multiline label="Nota" name="heartrateNote" />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default HeartrateForm;
