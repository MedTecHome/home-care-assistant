import React, { useEffect } from 'react';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import uuid from 'uuid4';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useLocation, useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import optionsTypesFormsPatientHealth from '../Nomenc';

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
  const { search, pathname } = useLocation();
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(search);
    if (!urlSearchParams.has('tipoPrueba')) {
      urlSearchParams.set('tipoPrueba', 'all');
      history.push({
        pathname,
        search: urlSearchParams.toString(),
      });
    }
  }, [search, pathname, history]);

  const handleSetTypeHistory = event => {
    const medicalForm = event.target.value;
    const urlSearchParams = new URLSearchParams(search);
    urlSearchParams.set('tipoPrueba', medicalForm);
    history.push({
      pathname,
      search: urlSearchParams.toString(),
    });
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
          </Grid>
        </Grid>
      </ListItem>
    </List>
  );
}

export default FiltersPatientHistoryComponent;
