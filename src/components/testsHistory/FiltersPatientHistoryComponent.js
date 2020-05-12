import React, { useEffect, useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import uuid from 'uuid4';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import { DesktopDatePicker, LocalizationProvider } from '@material-ui/pickers';
import MomentAdapter from '@material-ui/pickers/adapter/moment';
import TextField from '@material-ui/core/TextField';
import { usePatientHistoryContext } from './PatientHistoryContext';
import { getNomList } from '../../nomenc/NomencAction';

const useStyles = makeStyles({
  formControl: {
    width: '25%'
  },
  containerFilters: {
    display: 'flex',
    minWidth: '100%'
  }
});

function FiltersPatientHistoryComponent() {
  const { filters, setFilters } = usePatientHistoryContext();
  const [dateValue, setDateValue] = useState(null);
  const [options, setOptions] = useState([]);
  useEffect(() => {
    async function loadList() {
      const result = await getNomList('medicalforms')();
      setOptions(result);
    }
    loadList();
  }, []);
  const classes = useStyles();

  useEffect(() => {
    if (!filters.type) setFilters({ ...filters, type: 'all' });
  }, [filters, setFilters]);

  const handleSetTypeHistory = event => {
    setFilters({ ...filters, type: event.target.value });
  };

  const handleFilterDate = value => {
    setDateValue(value);
    setFilters({
      ...filters,
      ...(value ? { date: value.set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toDate() } : {})
    });
  };

  return (
    <List>
      <ListItem divider>
        <Grid container spacing={2} justify="space-between" className={classes.containerFilters}>
          <Grid item xs={12} sm={6} container alignContent="flex-end">
            <Select
              style={{
                flex: '1 1 100%'
              }}
              className={classes.formControl}
              value={(filters && filters.type) || 'all'}
              label="tipos historial"
              onChange={handleSetTypeHistory}
            >
              <MenuItem value="all">Todos</MenuItem>
              {options.map(types => (
                <MenuItem key={uuid()} value={types.id}>
                  {types.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={MomentAdapter}>
              <DesktopDatePicker
                renderInput={({ value, inputRef, InputProps, ref, onBlur, onFocus, placeholder }) => {
                  return (
                    <TextField
                      value={value}
                      ref={ref}
                      inputRef={inputRef}
                      InputProps={InputProps}
                      onBlur={onBlur}
                      onFocus={onFocus}
                      placeholder={placeholder}
                    />
                  );
                }}
                onChange={handleFilterDate}
                inputFormat="DD/MM/YYYY"
                variant="standard"
                size="small"
                value={dateValue}
                autoOk
                clearable
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </ListItem>
    </List>
  );
}

export default FiltersPatientHistoryComponent;
