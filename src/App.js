import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import RoutesComponent from './RoutesComponent';
import { DoctorContextProvider } from './contexts/doctor/DoctorContext';
import GetDoctorCompoent from './components/GetDoctorComponent';
import HeaderLayoutComponent from './components/HeaderLayoutComponent';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    paddingTop: 15,
    height: 'calc(100vh-0px)',
  },
}));

function App() {
  const classes = useStyles();
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Router>
        <GetDoctorCompoent />
        <Grid container>
          <HeaderLayoutComponent />
          <Container maxWidth="sm" className={classes.mainContainer}>
            <DoctorContextProvider>
              <RoutesComponent />
            </DoctorContextProvider>
          </Container>
        </Grid>
      </Router>
    </Suspense>
  );
}

export default App;
