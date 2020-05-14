import React, { useState } from 'react';
import { LocalizationProvider, DesktopDateRangePicker, MobileDateRangePicker } from '@material-ui/pickers';
import MomentAdapter from '@material-ui/pickers/adapter/moment';
import { TextField, useMediaQuery } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

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
  const match = useMediaQuery(theme => theme.breakpoints.down(680));
  const handleOnChange = values => {
    setDateValue(values);
  };

  const ResponsiveRangePiker = match ? MobileDateRangePicker : DesktopDateRangePicker;

  return (
    <Grid item xs={12} container justify="flex-end">
      <Box margin={1}>
        <LocalizationProvider dateAdapter={MomentAdapter}>
          <ResponsiveRangePiker
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
                  inputProps={{ ...inputProps, type: 'search', className: clsx(classes.rangePickerTextField) }}
                  size="small"
                  ref={ref}
                  onBlur={onBlur}
                  onFocus={onFocus}
                  onClick={onClick}
                  placeholder="__/__/__ - __/__/__"
                />
              );
            }}
            value={dateValue}
            variant="outlined"
            onChange={handleOnChange}
            clearable
          />
        </LocalizationProvider>
      </Box>
    </Grid>
  );
}

export default FilterPatientHistoryGraficsComponent;
