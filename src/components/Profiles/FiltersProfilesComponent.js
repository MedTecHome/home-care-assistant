import React, { useEffect, useMemo, useState } from 'react';
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
import { useAuthContext } from '../../contexts/AuthContext';
import AddButtonIcon from '../buttons/AddButtonIcon';
import useCustomStyles from '../../jss/globalStyles';
import listAccess from '../../commons/access';
import useDebounceCustom from '../../commons/useDebounceCustom';
import getRoles from '../../services/roles';
import { useProfilesContext } from './ProfilesContext';

export function InputSearchByFullname() {
  const { setParams, params } = useProfilesContext();
  const [filterName, setFilterName] = useState('');
  const debounceValue = useDebounceCustom(filterName, 500);
  const filterNameMemoize = useMemo(() => debounceValue, [debounceValue]);
  const classes = useCustomStyles();

  useEffect(() => {
    if (params.fullname !== filterNameMemoize) {
      setParams({ ...params, fullname: filterNameMemoize });
    }
  }, [params, filterNameMemoize, setParams]);

  const handleInputChange = event => {
    setFilterName(event.target.value);
  };
  return (
    <FormControl className={classes.formControl}>
      <InputLabel>Buscar por nombre</InputLabel>
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
  const { setParams } = useProfilesContext();
  const [roles, setRoles] = useState([]);
  const { currentUserProfile } = useAuthContext();
  const classes = useCustomStyles();
  const match = useMediaQuery(theme => theme.breakpoints.down('xs'));

  useEffect(() => {
    getRoles(100, {}, {}).then(result => setRoles(result.data));
  }, []);

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
          {currentUserProfile && currentUserProfile.role === 'superadmin' && (
            <Grid item xs={12} sm={4} md={3}>
              <FormControl className={classes.formControl}>
                <InputLabel>Tipo de perfil</InputLabel>
                <Select
                  name="filter-roles"
                  value={roles.length > 0 ? '' : ''}
                  onChange={event => setParams({ role: event.target.value })}
                >
                  {roles
                    .filter(rl => listAccess[currentUserProfile.role].includes(rl.id))
                    .map(role => (
                      <MenuItem key={uuid()} value={role}>
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

export default FiltersProfileComponent;
