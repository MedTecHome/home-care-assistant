import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import { useMediaQuery } from '@material-ui/core';
import useCustomStyles from '../../jss/globalStyles';
import { ADD_FORM_TEXT } from '../../commons/globalText';
import AddButtonIcon from '../buttons/AddButtonIcon';

const EnhancedTableToolbar = props => {
  const { filters, onAdd } = props;
  const classes = useCustomStyles();
  const match = useMediaQuery(theme => theme.breakpoints.down('xs'));

  const handleAddItem = () => {
    onAdd(ADD_FORM_TEXT);
  };
  return (
    <List style={{ paddingBottom: 0 }}>
      <ListItem>
        <Grid container spacing={3} justify="space-between" alignItems="flex-end">
          <Grid item xs={12} sm={3} md={3} className={match ? classes.addFloatingButton : ''}>
            <AddButtonIcon onClick={handleAddItem} size={match ? '2x' : 'lg'} />
          </Grid>
          <Grid item xs={12} sm={5} md={4} container justify="flex-end">
            {filters}
          </Grid>
        </Grid>
      </ListItem>
    </List>
  );
};

export default EnhancedTableToolbar;
