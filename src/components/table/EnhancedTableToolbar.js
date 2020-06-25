import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useMediaQuery, Box } from '@material-ui/core';
import { ADD_FORM_TEXT } from '../../commons/globalText';
import AddButtonIcon from '../buttons/AddButtonIcon';

const EnhancedTableToolbar = ({ filters, allowAdd, onAdd }) => {
  const match = useMediaQuery(theme => theme.breakpoints.down('xs'));

  const handleAddItem = () => {
    onAdd(ADD_FORM_TEXT);
  };

  return (
    <>
      {filters || allowAdd ? (
        <Box padding={2}>
          <Grid container spacing={1} justify="space-between" alignItems="center">
            <Grid item xs={12} sm={3} md={3}>
              {allowAdd ? <AddButtonIcon onClick={handleAddItem} size={match ? '2x' : 'lg'} /> : null}
            </Grid>
            <Grid item xs={12} sm={5} md={4} container justify="center">
              {filters}
            </Grid>
          </Grid>
        </Box>
      ) : null}
    </>
  );
};

export default EnhancedTableToolbar;
