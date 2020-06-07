import React, { useState, useEffect, useMemo } from 'react';
import moment from 'moment';
import { TextField } from '@material-ui/core';
import { LocalizationProvider, MobileDateRangePicker } from '@material-ui/pickers';
import { CalendarToday as CalendarTodayIcon } from '@material-ui/icons';
import MomentAdapter from '@material-ui/pickers/adapter/moment';
import clsx from 'clsx';
import useCustomStyles from '../../jss/globalStyles';

const today = moment();
const defaultStart = today.clone().add(-10, 'days');
const defaultEnd = today.clone().add(3, 'days');

function FiltersRangeDateComponent({ onRangeSet }) {
  const classes = useCustomStyles();
  const [dateValue, setDateValue] = useState([defaultStart, defaultEnd]);

  const value = useMemo(() => dateValue, [dateValue]);

  useEffect(() => {
    onRangeSet(value);
  }, [value, onRangeSet]);

  const handleOnChange = values => {
    setDateValue(values);
  };
  return (
    <LocalizationProvider dateAdapter={MomentAdapter}>
      <MobileDateRangePicker
        className={classes.formControl}
        renderInput={({ value: value1, inputRef, inputProps, ref, onBlur, onFocus, onClick }, { value: value2 }) => {
          return (
            <TextField
              className={classes.formControl}
              variant="outlined"
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
  );
}

export default FiltersRangeDateComponent;
