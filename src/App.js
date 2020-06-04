import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import RoutesComponent from './routes/RoutesComponent';
import HeaderComponent from './components/HeaderComponent';
import RouteService from './routes/RoutesService';
import ClinicInfoComponent from './components/ClinicInfoComponent';
import { MessageContextProvider } from './MessageHandle/MessageContext';
import CustomBoundary from './MessageHandle/CustomBoundary';
import { AuthContextProvider } from './contexts/AuthContext';
import MessageComponent from './MessageHandle/MessageComponent';
import theme1 from './themes/theme1';

const useStyles = makeStyles(() => ({
  mainContainer: {
    paddingTop: 15,
    maxHeight: '100vh'
  }
}));

function Routers() {
  const classes = useStyles();
  return (
    <Router>
      <RouteService />
      <HeaderComponent />
      <ClinicInfoComponent />
      <Container className={classes.mainContainer} maxWidth="lg">
        <Suspense fallback={<div>loading...</div>}>
          <RoutesComponent />
        </Suspense>
      </Container>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme1}>
      <MessageContextProvider>
        <CustomBoundary>
          <AuthContextProvider>
            <MessageComponent />
            <Routers />
          </AuthContextProvider>
        </CustomBoundary>
      </MessageContextProvider>
    </ThemeProvider>
  );
}

export default App;
