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
import getNomenclator from '../../services/nomenclators';

const useStyles = makeStyles({
  formControl: {
    width: '100%'
  },
  containerFilters: {
    display: 'flex',
    minWidth: '100%'
  }
});

function FiltersPatientHistoryComponent({ onSelectType, onSelectDate }) {
  const [dateValue, setDateValue] = useState(null);
  const [valueType, setValueType] = useState('');
  const [options, setOptions] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    async function loadList() {
      getNomenclator('medicalforms').then(res => {
        setOptions(res.data);
      });
    }
    loadList();
  }, []);

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
          <Grid item xs={12} sm={4} md={6} container alignContent="flex-end">
            <Select
              className={classes.formControl}
              value={valueType}
              label="tipos historial"
              onChange={handleSetTypeHistory}
            >
              {options.map(types => (
                <MenuItem key={uuid()} value={types.id}>
                  {types.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={4} md={6}>
            <LocalizationProvider dateAdapter={MomentAdapter}>
              <DesktopDatePicker
                className={classes.formControl}
                onChange={handleFilterDate}
                inputFormat="DD/MM/YYYY"
                variant="standard"
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
