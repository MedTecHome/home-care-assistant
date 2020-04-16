import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';

const PageNotFound = lazy(() => import('../components/NotFoundComponent'));
const LoginComponent = lazy(() => import('../components/login/LoginComponent'));
// const LogoutComponent = lazy(() => import('../components/login/LogoutComponent'));
const HomeComponent = lazy(() => import('../components/HomeComponent'));
const PatientHealthForm = lazy(() => import('../components/patientForm/PatientHealthForm'));

function RoutesComponent() {
  return (
    <Switch>
      <Route path="/" exact component={HomeComponent} />
      <Route path="/login" exact component={LoginComponent} />
      {/* <PrivateRoutes path="/logout" exact component={LogoutComponent} /> */}
      <PrivateRoutes path="/inicio/" exact component={HomeComponent} />
      <PrivateRoutes path="/paciente/" exact component={HomeComponent} />
      <PrivateRoutes path="/paciente/form" exact component={PatientHealthForm} />
      <PrivateRoutes path="/doctor" exact component={HomeComponent} />
      <PrivateRoutes path="/doctor/paciente" exact component={HomeComponent} />
      <Route component={PageNotFound} />
    </Switch>
  );
}

export default RoutesComponent;
