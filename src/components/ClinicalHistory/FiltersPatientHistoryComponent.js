import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import { FormControl, InputLabel, Typography, Box } from '@material-ui/core';
import { testFormsNames } from '../../helpers/constants';
import { compareStringTagName } from '../../helpers/utils';
import FiltersRangeDateComponent from '../filters/FiltersRangeDateComponent';
import IconTestComponent from './IconTestComponent';

const useStyles = makeStyles({
  formControl: {
    width: '100%',
    '& > .MuiSelect-root': {
      display: 'flex'
    },
    '& > .MuiSelect-selectMenu': {
      height: 0
    }
  },
  containerFilters: {
    display: 'flex',
    minWidth: '100%'
  },
  iconSize: {
    width: 24,
    height: 24,
    marginRight: 10
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
    <FormControl variant="outlined" className={classes.formControl} size="small">
      <InputLabel variant="outlined">Seleccione</InputLabel>
      <Select label="Seleccione" className={classes.formControl} value={valueType} onChange={handleSetTypeHistory}>
        <MenuItem value="recently">
          <IconTestComponent type="" className={classes.iconSize} />
          <Typography>Pruebas recientes</Typography>
        </MenuItem>
        {testFormsNames.sort(compareStringTagName).map(types => (
          <MenuItem key={types.id} value={types.id}>
            <IconTestComponent type={types.id} className={classes.iconSize} />
            <Typography> {types.name} </Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function FiltersPatientHistoryComponent({ onSelectDate, defaultType, onSelectType }) {
  const handleFilterDate = useCallback(
    value => {
      const array = [value[0].set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).unix(), value[1].unix()];
      onSelectDate(array);
    },
    [onSelectDate]
  );

  return (
    <Box padding={2}>
      <Grid container justify="space-between" alignItems="flex-start" spacing={2}>
        <Grid item xs={12} sm={6} md={4} container alignContent="flex-end">
          <SelectClinicTest defaultType={defaultType} onSelectType={onSelectType} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FiltersRangeDateComponent onRangeSet={handleFilterDate} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default FiltersPatientHistoryComponent;
