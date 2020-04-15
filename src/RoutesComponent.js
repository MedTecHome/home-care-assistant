import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const PageNotFound = lazy(() => import('./components/NotFoundComponent'));
const LoginComponent = lazy(() => import('./components/login/LoginComponent'));
const IndexHomComponent = lazy(() => import('./components/IndexHome'));
const PatientHealthForm = lazy(() => import('./components/patientForm/PatientHealthForm'));

function RoutesComponent() {
  return (
    <Switch>
      <Route path="/" exact component={(props) => <IndexHomComponent {...props} />} />
      <Route path="/login" exact component={(props) => <LoginComponent {...props} />} />
      <Route path="/paciente/" exact component={(props) => <IndexHomComponent {...props} />} />
      <Route path="/paciente/form" exact component={(props) => <PatientHealthForm {...props} />} />
      <Route path="/doctor" exact component={(props) => <IndexHomComponent {...props} />} />
      <Route path="/doctor/paciente" exact component={(props) => <IndexHomComponent {...props} />} />
      <Route path="/doctor/apcientes" exact component={(props) => <IndexHomComponent {...props} />} />
      <Route path="/doctor/apcientes" exact component={(props) => <IndexHomComponent {...props} />} />
      <Route component={(props) => <PageNotFound {...props} />} />
    </Switch>
  );
}

export default RoutesComponent;
