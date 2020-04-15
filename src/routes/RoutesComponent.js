import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';

const PageNotFound = lazy(() => import('../components/NotFoundComponent'));
const LoginComponent = lazy(() => import('../components/login/LoginComponent'));
const LogoutComponent = lazy(() => import('../components/login/LogoutComponent'));
const IndexHomComponent = lazy(() => import('../components/IndexHome'));
const PatientHealthForm = lazy(() => import('../components/patientForm/PatientHealthForm'));

function RoutesComponent() {
  return (
    <Switch>
      <Route path="/" exact component={(props) => <IndexHomComponent {...props} />} />
      <Route path="/login" exact component={(props) => <LoginComponent {...props} />} />
      <PrivateRoutes path="/logout" exact component={(props) => <LogoutComponent {...props} />} />
      <PrivateRoutes path="/inicio/" exact component={(props) => <IndexHomComponent {...props} />} />
      <PrivateRoutes path="/paciente/" exact component={(props) => <IndexHomComponent {...props} />} />
      <PrivateRoutes path="/paciente/form" exact component={(props) => <PatientHealthForm {...props} />} />
      <PrivateRoutes path="/doctor" exact component={(props) => <IndexHomComponent {...props} />} />
      <PrivateRoutes path="/doctor/paciente" exact component={(props) => <IndexHomComponent {...props} />} />
      <PrivateRoutes path="/doctor/apcientes" exact component={(props) => <IndexHomComponent {...props} />} />
      <PrivateRoutes path="/doctor/apcientes" exact component={(props) => <IndexHomComponent {...props} />} />
      <Route component={(props) => <PageNotFound {...props} />} />
    </Switch>
  );
}

export default RoutesComponent;
