import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useMediaQuery, makeStyles } from '@material-ui/core';
import { ADD_FORM_TEXT } from '../../commons/globalText';
import AddButtonIcon from '../buttons/AddButtonIcon';

const useStyles = makeStyles({
  root: {
    margin: '10px 0'
  }
});

const EnhancedTableToolbar = props => {
  const { filters, allowAdd, onAdd } = props;
  const classes = useStyles();
  const match = useMediaQuery(theme => theme.breakpoints.down('xs'));

  const handleAddItem = () => {
    onAdd(ADD_FORM_TEXT);
  };
  return (
    <div className={classes.root}>
      <Grid container justify="space-between" alignItems="flex-end">
        <Grid item xs={12} sm={3} md={3}>
          {allowAdd ? <AddButtonIcon onClick={handleAddItem} size={match ? '2x' : 'lg'} /> : null}
        </Grid>
        <Grid item xs={12} sm={5} md={4} container justify="flex-end">
          {filters}
        </Grid>
      </Grid>
    </div>
  );
};

export default EnhancedTableToolbar;
