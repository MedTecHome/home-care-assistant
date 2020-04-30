import React, { useContext } from 'react';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import uuid from 'uuid4';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import optionsTypesFormsPatientHealth from '../nomenc';
import { usePatientHistoryContext } from './PatientHistoryContext';
import { AuthContext } from '../../../contexts/AuthContext';

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
  const { setFilters, filters } = usePatientHistoryContext();
  const classes = useStyles();

  const handleSetTypeHistory = event => {
    const medicalForm = event.target.value;
    setFilters({ ...filters, type: medicalForm });
  };

  return (
    <List>
      <ListItem divider>
        <div className={classes.containerFilters}>
          <Select
            className={classes.formControl}
            defaultValue="all"
            label="tipos historial"
            onChange={handleSetTypeHistory}
          >
            <MenuItem value="all">Todos</MenuItem>
            {optionsTypesFormsPatientHealth.map(types => (
              <MenuItem key={uuid()} value={types.id}>
                {types.name}
              </MenuItem>
            ))}
          </Select>
        </div>
      </ListItem>
    </List>
  );
}

export default FiltersPatientHistoryComponent;
