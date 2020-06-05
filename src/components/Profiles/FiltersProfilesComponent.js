import React from 'react';
import { Grid, useMediaQuery, makeStyles } from '@material-ui/core';
import AddButtonIcon from '../buttons/AddButtonIcon';
import { useProfilesContext } from './ProfilesContext';
import InputSearchByTagname from '../filters/InputSearchByTagName';

const useStyle = makeStyles({
  root: {
    margin: '10px 0'
  }
});

function FiltersProfileComponent({ onClickAdd }) {
  const { params, setParams } = useProfilesContext();
  const classes = useStyle();
  const match = useMediaQuery(theme => theme.breakpoints.down('xs'));

  return (
    <div className={classes.root}>
      <Grid container justify="space-between" alignItems="flex-end">
        <Grid item xs={12} sm={3} md={3}>
          <AddButtonIcon onClick={onClickAdd} size={match ? '2x' : 'lg'} />
        </Grid>
        <Grid item xs={12} sm={5} md={4} container justify="flex-end">
          <InputSearchByTagname tagName="fullname" params={params} setParams={setParams} />
        </Grid>
      </Grid>
    </div>
  );
}

export default FiltersProfileComponent;
