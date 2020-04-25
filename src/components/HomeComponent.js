import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useMediaQuery } from '@material-ui/core';
import RegisterFormComponent from './login/RegisterFormComponent';
import { AuthContextProvider } from '../contexts/AuthContext';

const useStyles = makeStyles({
  homeContainer: {},
});

function HomeComponent() {
  const classes = useStyles();
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <Grid container className={classes.homeContainer}>
      {!match && <Grid item xs={12} sm={6} md={8} />}
      <Grid item container xs={12} sm={6} md={4}>
        <AuthContextProvider>
          <RegisterFormComponent />
        </AuthContextProvider>
      </Grid>
    </Grid>
  );
}

export default HomeComponent;
