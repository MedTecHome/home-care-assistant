import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import RoutesComponent from './routes/RoutesComponent';
import HeaderLayoutComponent from './components/HeaderLayoutComponent';
import RouteService from './routes/RoutesService';

const useStyles = makeStyles(() => ({
  mainContainer: {
    paddingTop: 15,
    height: 'calc(100vh-0px)',
  },
}));

function App() {
  const classes = useStyles();
  return (
    <Router>
      <RouteService />
      <Grid container>
        <HeaderLayoutComponent />
        <Suspense fallback={<div>loading...</div>}>
          <Container maxWidth="sm" className={classes.mainContainer}>
            <RoutesComponent />
          </Container>
        </Suspense>
      </Grid>
    </Router>
  );
}

export default App;
