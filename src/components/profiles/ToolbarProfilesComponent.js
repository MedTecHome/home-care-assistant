import React, { memo, useContext, useEffect, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import { useMediaQuery } from '@material-ui/core';
import useTheme from '@material-ui/core/styles/useTheme';
import { useRolesContext, withRolesContext } from '../fields/roles/RolesContext';
import { useProfilesContext } from './ProfilesContext';
import { AuthContext } from '../../contexts/AuthContext';

const useStyles = makeStyles({
  formControl: {
    minWidth: '100%',
  },
  listRoot: {
    position: 'inherit',
    background: '#fff',
  },
  addButtonIcon: {
    fontSize: 48,
    background: '#fff',
  },
  addFloatingButton: {
    position: 'fixed',
    zIndex: 666,
    bottom: 0,
    right: 0,
  },
});

function ToolbarProfileComponent({ onClickAdd }) {
  const { currentUserProfile } = useContext(AuthContext);
  const { roles, getRoles } = useRolesContext();
  const { filters, setProfileFilter } = useProfilesContext();
  const [fullname, setFullName] = useState('');

  const classes = useStyles();
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down('xs'));

  useEffect(() => {
    getRoles();
  }, [getRoles]);

  const handleSearchClick = () => {
    if (fullname) {
      setProfileFilter({ ...filters, fullname });
    }
  };

  return (
    <List className={classes.listRoot}>
      <Grid container spacing={3} justify="space-between">
        <Grid item xs={12} sm={3} md={3} className={match ? classes.addFloatingButton : ''}>
          <IconButton color="primary" onClick={onClickAdd}>
            <AddCircleIcon fontSize="large" className={classes.addButtonIcon} />
          </IconButton>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl className={classes.formControl}>
            <InputLabel>buscar por nombre</InputLabel>
            <Input
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
          <Grid item xs={12} sm={3} md={3}>
            <FormControl className={classes.formControl}>
              <InputLabel>Tipo de perfile</InputLabel>
              <Select
                name="filter-roles"
                value={filters['role.id'] || ''}
                onChange={event => setProfileFilter({ ...filters, 'role.id': event.target.value })}
              >
                {roles.map(role => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}
      </Grid>
    </List>
  );
}

export default withRolesContext(memo(ToolbarProfileComponent));
