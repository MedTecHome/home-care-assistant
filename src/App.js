import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container, CircularProgress } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import RoutesComponent from './routes/RoutesComponent';
import HeaderComponent from './components/HeaderComponent';
import RouteService from './routes/RoutesService';
import ClinicInfoComponent from './components/ClinicInfoComponent';
import { MessageContextProvider } from './MessageHandle/MessageContext';
import CustomBoundary from './MessageHandle/CustomBoundary';
import { AuthContextProvider, useAuthContext } from './contexts/AuthContext';
import MessageComponent from './MessageHandle/MessageComponent';
import theme1 from './themes/theme1';
import { isLocal } from './helpers/utils';

const useStyles = makeStyles(() => ({
  mainContainer: {
    paddingTop: 15,
    maxHeight: '100vh'
  },
  authLoading: {
    position: 'absolute',
    width: '100%',
    height: '100vh',
    top: 0,
    bottom: 0,
    backgroundColor: '#fff',
    right: 0,
    left: 0,
    zIndex: 1101,
    opacity: '0.8',
    display: 'table'
  },
  circularProgress: {
    display: 'table-cell',
    verticalAlign: 'middle',
    textAlign: 'center'
  }
}));

function AuthLoading() {
  const { currentUser, currentUserProfile } = useAuthContext();
  const classes = useStyles();
  const isLogin = isLocal ? true : currentUser;

  if (isLogin && !currentUserProfile) {
    return (
      <div className={classes.authLoading}>
        <div className={classes.circularProgress}>
          <CircularProgress size={44} />
        </div>
      </div>
    );
  }
  return null;
}

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
            <AuthLoading />
            <MessageComponent />
            <Routers />
          </AuthContextProvider>
        </CustomBoundary>
      </MessageContextProvider>
    </ThemeProvider>
  );
}

export default App;
