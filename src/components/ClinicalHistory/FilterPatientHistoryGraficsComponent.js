import React, { useState } from 'react';
import { LocalizationProvider, MobileDateRangePicker } from '@material-ui/pickers';
import { CalendarToday as CalendarTodayIcon } from '@material-ui/icons';
import MomentAdapter from '@material-ui/pickers/adapter/moment';
import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  formControl: {
    width: '100%'
  },
  rangePickerTextField: {
    fontSize: '0.837rem'
  }
});

function FilterPatientHistoryGraficsComponent() {
  const [dateValue, setDateValue] = useState([null, null]);
  const classes = useStyles();
  const handleOnChange = values => {
    setDateValue(values);
  };

  return (
    <Grid item xs={12} container justify="flex-end">
      <Box margin={1}>
        <LocalizationProvider dateAdapter={MomentAdapter}>
          <MobileDateRangePicker
            className={classes.formControl}
            renderInput={(
              { value: value1, inputRef, inputProps, ref, onBlur, onFocus, onClick },
              { value: value2 }
            ) => {
              return (
                <TextField
                  label="Rango de fecha"
                  value={`${value1 || '      '} ~ ${value2}`}
                  inputRef={inputRef}
                  inputProps={{ ...inputProps, className: clsx(classes.rangePickerTextField) }}
                  size="small"
                  ref={ref}
                  onBlur={onBlur}
                  onFocus={onFocus}
                  onClick={onClick}
                  placeholder="__/__/__ - __/__/__"
                />
              );
            }}
            showToolbar={false}
            value={dateValue}
            variant="outlined"
            onChange={handleOnChange}
            clearLabel="Limpiar"
            inputFormat="DD/MM/YYYY"
            okLabel="Aceptar"
            cancelLabel="Cancelar"
            allowKeyboardControl
            clearable
            open={<CalendarTodayIcon />}
          />
        </LocalizationProvider>
      </Box>
    </Grid>
  );
}

export default FilterPatientHistoryGraficsComponent;
