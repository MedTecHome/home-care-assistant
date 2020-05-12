import React, { useState } from 'react';
import { LocalizationProvider, DesktopDateRangePicker } from '@material-ui/pickers';
import MomentAdapter from '@material-ui/pickers/adapter/moment';
import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

function FilterPatientHistoryGraficsComponent() {
  const [dateValue, setDateValue] = useState([null, null]);
  const handleOnChange = values => {
    setDateValue(values);
  };

  return (
    <Grid item xs={12} container justify="flex-end">
      <Box margin={1}>
        <LocalizationProvider dateAdapter={MomentAdapter}>
          <DesktopDateRangePicker
            renderInput={(
              { value: value1, inputRef, InputProps, ref, onBlur, onFocus, onChange },
              { value: value2 }
            ) => {
              return (
                <>
                  <TextField
                    label="Rango de fecha"
                    value={`${value1 || '      '} ~ ${value2}`}
                    inputRef={inputRef}
                    InputProps={InputProps}
                    ref={ref}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onChange={onChange}
                    placeholder="__/__/__ - __/__/__"
                  />
                </>
              );
            }}
            value={dateValue}
            variant="outlined"
            onChange={handleOnChange}
          />
        </LocalizationProvider>
      </Box>
    </Grid>
  );
}

export default FilterPatientHistoryGraficsComponent;
