import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RoutesComponent from './routes/RoutesComponent';
import HeaderComponent from './components/HeaderComponent';
import RouteService from './routes/RoutesService';
import MessageComponent from './MessageHandle/MessageComponent';

const useStyles = makeStyles(() => ({
  mainContainer: {
    paddingTop: 15,
    maxHeight: '100vh'
  }
}));

function App() {
  const classes = useStyles();
  return (
    <Router>
      <RouteService />
      <HeaderComponent />
      <Container className={classes.mainContainer} maxWidth="lg">
        <MessageComponent />
        <Suspense fallback={<div>loading...</div>}>
          <RoutesComponent />
        </Suspense>
      </Container>
    </Router>
  );
}

export default App;
