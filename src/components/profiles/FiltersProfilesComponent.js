import React, { memo, useEffect, useState } from 'react';
import uuid from 'uuid4';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import { useMediaQuery } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import { useRolesContext, withRolesContext } from '../fields/roles/RolesContext';
import { useProfilesContext } from './ProfilesContext';
import { useAuthContext } from '../../contexts/AuthContext';
import AddButtonIcon from '../buttons/AddButtonIcon';
import useCustomStyles from '../../jss/globalStyles';

const listAccess = {
  doctor: ['patient'],
  admin: ['doctor'],
  developer: ['patient', 'doctor', 'admin'],
};

function FiltersProfileComponent({ onClickAdd }) {
  const { currentUserProfile } = useAuthContext();
  const { roles, getRoles } = useRolesContext();
  const { filters, setFilters } = useProfilesContext();
  const [fullname, setFullName] = useState('');

  const classes = useCustomStyles();
  const match = useMediaQuery(theme => theme.breakpoints.down('xs'));

  useEffect(() => {
    getRoles();
  }, [getRoles]);

  const handleSearchClick = () => {
    setFilters({ ...filters, fullname });
  };

  return (
    <List>
      <ListItem>
        <Grid container spacing={3} justify="space-between" alignItems="flex-end">
          <Grid item xs={12} sm={3} md={3} className={match ? classes.addFloatingButton : ''}>
            <AddButtonIcon onClick={onClickAdd} size={match ? '2x' : 'lg'} />
          </Grid>
          <Grid item xs={12} sm={5} md={4} container justify="flex-end">
            <FormControl className={classes.formControl}>
              <InputLabel>buscar por nombre</InputLabel>
              <Input
                type="search"
                value={fullname}
                onChange={event => setFullName(event.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearchClick}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
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
