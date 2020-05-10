import React, { memo, useEffect, useMemo, useState } from 'react';
import uuid from 'uuid4';
import {
  Grid,
  List,
  MenuItem,
  Select,
  useMediaQuery,
  InputLabel,
  FormControl,
  InputAdornment,
  Input,
  ListItem
} from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons/';
import { useRolesContext, withRolesContext } from '../fields/roles/RolesContext';
import { useProfilesContext } from './ProfilesContext';
import { useAuthContext } from '../../contexts/AuthContext';
import AddButtonIcon from '../buttons/AddButtonIcon';
import useCustomStyles from '../../jss/globalStyles';
import listAccess from '../../commons/access';
import useDebounceCustom from '../../commons/useDebounceCustom';

function InputSearchByFullname() {
  const { filters, setFilters } = useProfilesContext();
  const [filterName, setFilterName] = useState('');
  const debounceValue = useDebounceCustom(filterName, 500);
  const filterNameMemoize = useMemo(() => debounceValue, [debounceValue]);
  const classes = useCustomStyles();

  useEffect(() => {
    if (filters.fullname !== filterNameMemoize) setFilters({ ...filters, fullname: filterNameMemoize });
  }, [setFilters, filterNameMemoize, filters]);

  const handleInputChange = event => {
    setFilterName(event.target.value);
  };
  return (
    <FormControl className={classes.formControl}>
      <InputLabel>buscar por nombre</InputLabel>
      <Input
        type="search"
        onChange={handleInputChange}
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </FormControl>
  );
}

function FiltersProfileComponent({ onClickAdd }) {
  const { filters, setFilters } = useProfilesContext();
  const { currentUserProfile } = useAuthContext();
  const { roles, getRoles } = useRolesContext();
  const classes = useCustomStyles();
  const match = useMediaQuery(theme => theme.breakpoints.down('xs'));

  useEffect(() => {
    getRoles();
  }, [getRoles]);

  return (
    <List>
      <ListItem>
        <Grid container spacing={3} justify="space-between" alignItems="flex-end">
          <Grid item xs={12} sm={3} md={3} className={match ? classes.addFloatingButton : ''}>
            <AddButtonIcon onClick={onClickAdd} size={match ? '2x' : 'lg'} />
          </Grid>
          <Grid item xs={12} sm={5} md={4} container justify="flex-end">
            <InputSearchByFullname />
          </Grid>
          {currentUserProfile && currentUserProfile.role.id === 'admin' && (
            <Grid item xs={12} sm={4} md={3}>
              <FormControl className={classes.formControl}>
                <InputLabel>Tipo de perfile</InputLabel>
                <Select
                  name="filter-roles"
                  value={roles.length > 0 ? filters['role.id'] || '' : ''}
                  onChange={event => setFilters({ ...filters, 'role.id': event.target.value })}
                >
                  {roles
                    .filter(rl => listAccess[currentUserProfile.role.id].includes(rl.id))
                    .map(role => (
                      <MenuItem key={uuid()} value={role.id}>
                        {role.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
          )}
        </Grid>
      </ListItem>
    </List>
  );
}

export default withRolesContext(memo(FiltersProfileComponent));
