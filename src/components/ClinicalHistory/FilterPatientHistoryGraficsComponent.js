import React, { useState } from 'react';
import { LocalizationProvider, MobileDateRangePicker } from '@material-ui/pickers';
import { CalendarToday as CalendarTodayIcon } from '@material-ui/icons';
import MomentAdapter from '@material-ui/pickers/adapter/moment';
import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles({
  formControl: {
    width: 260,
    textAlign: 'right'
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
    <Grid item xs={12} container justify="flex-end" spacing={1}>
      <LocalizationProvider dateAdapter={MomentAdapter}>
        <MobileDateRangePicker
          className={classes.formControl}
          renderInput={({ value: value1, inputRef, inputProps, ref, onBlur, onFocus, onClick }, { value: value2 }) => {
            return (
              <TextField
                className={classes.formControl}
                label="Rango de fecha"
                value={value1 && value2 && `${value1} ~ ${value2}`}
                inputRef={inputRef}
                inputProps={{ ...inputProps, className: clsx(classes.rangePickerTextField) }}
                size="small"
                ref={ref}
                onBlur={onBlur}
                onFocus={onFocus}
                onClick={onClick}
                placeholder="Seleccionar rango de fecha"
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
    </Grid>
  );
}

export default FilterPatientHistoryGraficsComponent;
