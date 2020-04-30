import React from 'react';
import { Select, TextField } from 'mui-rff';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import DateFieldComponent from '../fields/DateFieldComponent';
import TimeFieldComponent from '../fields/TimeFieldComponent';

function GlucosaForm({ classStyle }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <div className={classStyle.paper}>
      <Typography className={classStyle.titleForms} variant="subtitle1">
        Glucosa:
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            className={classStyle.formControl}
            type="number"
            required
            variant="outlined"
            size="small"
            InputLabelProps={{
              color: 'primary',
              shrink: true,
            }}
            label={`${matches ? 'Concent.' : 'Concentracion'} de azucar`}
            name="sugarConcentration"
          />
        </Grid>
        <Grid item xs={12}>
          <Select
            defaultValue={undefined}
            className={classStyle.formControl}
            label="Horario"
            name="schedule"
            variant="outlined"
            formControlProps={{
              size: 'small',
            }}
            fieldProps={{
              InputLabelProps: {
                shrink: true,
              },
            }}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </Grid>
        <DateFieldComponent classes={classStyle} name="glucoseDate" label="Dia" />
        <TimeFieldComponent label="Hora" name="glucoseTime" classes={classStyle} />
        <Grid item xs={12}>
          <TextField
            className={classStyle.formControl}
            size="small"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            multiline
            rows={4}
            label="Nota"
            name="glucoseNote"
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default GlucosaForm;
