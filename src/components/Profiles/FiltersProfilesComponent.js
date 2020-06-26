import React from 'react';
import { Grid, useMediaQuery, makeStyles, Typography } from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';
import AddButtonIcon from '../buttons/AddButtonIcon';
import { useProfilesContext } from './ProfilesContext';
import InputSearchByTagname from '../filters/InputSearchByTagName';

const disabledAddText = 'Límite de doctores alcanzado.';

const useStyle = makeStyles(theme => ({
  root: {
    padding: '10px'
  },
  disabledAddText: {
    display: 'flex',
    alignItems: 'center',
    color: '#586069!important',
    [theme.breakpoints.up('xs')]: {
      whiteSpace: 'nowrap'
    },
    '& *': {
      fontSize: '0.864rem',
      marginRight: 2
    }
  }
}));

function FiltersProfileComponent({ disabledAdd = false, onClickAdd }) {
  const { nameFilter, setNameFilter } = useProfilesContext();
  const classes = useStyle();
  const match = useMediaQuery(theme => theme.breakpoints.down('xs'));

  return (
    <div className={classes.root}>
      <Grid container spacing={1} justify="space-between" alignItems="center">
        <Grid item xs={12} sm={3} md={2}>
          <AddButtonIcon disabled={disabledAdd} onClick={onClickAdd} size={match ? '2x' : 'lg'} />
          {disabledAdd ? (
            <div className={classes.disabledAddText}>
              <InfoOutlined />
              <Typography>{disabledAddText}</Typography>
            </div>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={5} md={4} container justify="center">
          <InputSearchByTagname nameFilter={nameFilter} setNameFilter={setNameFilter} />
        </Grid>
      </Grid>
    </div>
  );
}

export default FiltersProfileComponent;
