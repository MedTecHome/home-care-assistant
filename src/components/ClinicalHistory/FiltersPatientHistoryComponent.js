import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import { FormControl, InputLabel } from '@material-ui/core';
import { testFormsNames } from '../../helpers/constants';
import FiltersRangeDateComponent from '../filters/FiltersRangeDateComponent';

const useStyles = makeStyles({
  filterRoot: {
    margin: '10px 0'
  },
  formControl: {
    width: '100%'
  },
  containerFilters: {
    display: 'flex',
    minWidth: '100%'
  }
});

function SelectClinicTest({ defaultType, onSelectType }) {
  const classes = useStyles();
  const [valueType, setValueType] = useState('');
  useEffect(() => {
    setValueType(defaultType || 'recently');
  }, [defaultType]);

  const handleSetTypeHistory = useCallback(
    event => {
      setValueType(event.target.value);
      onSelectType(event.target.value);
    },
    [onSelectType]
  );
  return (
    <FormControl size="small" variant="outlined" className={classes.formControl}>
      <InputLabel variant="outlined">Seleccione</InputLabel>
      <Select label="Seleccione" className={classes.formControl} value={valueType} onChange={handleSetTypeHistory}>
        <MenuItem value="recently">Pruebas recientes</MenuItem>
        {testFormsNames.map(types => (
          <MenuItem key={types.id} value={types.id}>
            {types.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function FiltersPatientHistoryComponent({ onSelectDate, defaultType, onSelectType }) {
  const classes = useStyles();
  const handleFilterDate = useCallback(
    value => {
      const array = [value[0].set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).unix(), value[1].unix()];
      onSelectDate(array);
    },
    [onSelectDate]
  );

  return (
    <div className={classes.filterRoot}>
      <Grid container justify="flex-start" spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3} container alignContent="flex-end">
          <SelectClinicTest defaultType={defaultType} onSelectType={onSelectType} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <FiltersRangeDateComponent onRangeSet={handleFilterDate} />
        </Grid>
      </Grid>
    </div>
  );
}

export default FiltersPatientHistoryComponent;
