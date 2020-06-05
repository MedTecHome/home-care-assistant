import React, { useState, useEffect } from 'react';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import { DesktopDatePicker, LocalizationProvider } from '@material-ui/pickers';
import MomentAdapter from '@material-ui/pickers/adapter/moment';
import TextField from '@material-ui/core/TextField';
import { FormControl, InputLabel } from '@material-ui/core';
import { testFormsNames } from '../../helpers/constants';

const useStyles = makeStyles({
  formControl: {
    width: '100%'
  },
  containerFilters: {
    display: 'flex',
    minWidth: '100%'
  }
});

function FiltersPatientHistoryComponent({ defaultType, onSelectType, onSelectDate }) {
  const [dateValue, setDateValue] = useState(null);
  const [valueType, setValueType] = useState('');
  const classes = useStyles();

  useEffect(() => {
    setValueType(defaultType || 'recently');
  }, [defaultType]);

  const handleSetTypeHistory = event => {
    setValueType(event.target.value);
    onSelectType(event.target.value);
  };

  const handleFilterDate = value => {
    setDateValue(value);
    onSelectDate(value.set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).unix());
  };

  return (
    <List>
      <ListItem divider>
        <Grid container spacing={2} justify="flex-start" className={classes.containerFilters}>
          <Grid item xs={12} sm={4} container alignContent="flex-end">
            <FormControl size="small" variant="outlined" className={classes.formControl}>
              <InputLabel variant="outlined">Seleccione</InputLabel>
              <Select
                label="Seleccione"
                className={classes.formControl}
                value={valueType}
                onChange={handleSetTypeHistory}
              >
                <MenuItem value="recently">Pruebas recientes</MenuItem>
                {testFormsNames.map(types => (
                  <MenuItem key={types.id} value={types.id}>
                    {types.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <LocalizationProvider dateAdapter={MomentAdapter}>
              <DesktopDatePicker
                className={classes.formControl}
                onChange={handleFilterDate}
                inputFormat="DD/MM/YYYY"
                size="small"
                value={dateValue}
                autoOk
                clearable
                renderInput={({ value, inputRef, InputProps, ref, onBlur, onFocus, placeholder, onChange }) => {
                  return (
                    <TextField
                      className={classes.formControl}
                      value={value}
                      ref={ref}
                      inputRef={inputRef}
                      InputProps={InputProps}
                      onBlur={onBlur}
                      onFocus={onFocus}
                      placeholder={placeholder}
                      onChange={onChange}
                    />
                  );
                }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </ListItem>
    </List>
  );
}

export default FiltersPatientHistoryComponent;
