import React from 'react';
import { Grid, useMediaQuery, makeStyles } from '@material-ui/core';
import AddButtonIcon from '../buttons/AddButtonIcon';
import { useProfilesContext } from './ProfilesContext';
import InputSearchByTagname from '../filters/InputSearchByTagName';

const useStyle = makeStyles({
  root: {
    padding: '10px'
  }
});

function FiltersProfileComponent({ onClickAdd }) {
  const { nameFilter, setNameFilter } = useProfilesContext();
  const classes = useStyle();
  const match = useMediaQuery(theme => theme.breakpoints.down('xs'));

  return (
    <div className={classes.root}>
      <Grid container spacing={1} justify="space-between" alignItems="center">
        <Grid item xs={12} sm={3} md={3}>
          <AddButtonIcon onClick={onClickAdd} size={match ? '2x' : 'lg'} />
        </Grid>
        <Grid item xs={12} sm={5} md={4} container justify="center">
          <InputSearchByTagname nameFilter={nameFilter} setNameFilter={setNameFilter} />
        </Grid>
      </Grid>
    </div>
  );
}

export default FiltersProfileComponent;
