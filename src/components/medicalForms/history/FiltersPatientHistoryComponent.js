import React, { useEffect, useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import uuid from 'uuid4';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { getListMedicalForms } from '../../../nomenc/NomMedicalHealth';
import { usePatientHistoryContext } from './PatientHistoryContext';

const useStyles = makeStyles({
  formControl: {
    width: '25%',
  },
  containerFilters: {
    display: 'flex',
    minWidth: '100%',
  },
});

function FiltersPatientHistoryComponent() {
  const { filters, setFilters } = usePatientHistoryContext();
  const [options, setOptions] = useState([]);
  useEffect(() => {
    async function loadList() {
      const result = await getListMedicalForms();
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

  return (
    <List>
      <ListItem divider>
        <Grid container spacing={2} justify="space-between" className={classes.containerFilters}>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="h5"
              style={{
                flex: '1 1 100%',
                color: '#666',
              }}
            >
              Historial de pruebas
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6} container alignContent="flex-end">
            <Select
              style={{
                flex: '1 1 100%',
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
        </Grid>
      </ListItem>
    </List>
  );
}

export default FiltersPatientHistoryComponent;
