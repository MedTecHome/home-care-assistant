/* eslint-disable react/jsx-props-no-spreading */
import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import { HospitalContextProvider } from '../components/hospital/context/HospitalContext';

const PageNotFound = lazy(() => import('../components/NotFoundComponent'));
const LoginComponent = lazy(() => import('../components/login/LoginComponent'));
const LogoutComponent = lazy(() => import('../components/login/LogoutComponent'));
const IndexHomeComponent = lazy(() => import('../components/IndexHome'));
const DoctorComponent = lazy(() => import('../components/IndexHome'));
const HospitalComponent = lazy(() => import('../components/hospital/HospitalComponent'));
const PatientsComponent = lazy(() => import('../components/IndexHome'));
const PatientHealthForm = lazy(() => import('../components/patientForm/PatientHealthForm'));

function RoutesComponent() {
  return (
    <Switch>
      <Route path="/" exact component={(props) => <IndexHomeComponent {...props} />} />
      <Route path="/login" exact component={(props) => <LoginComponent {...props} />} />
      <PrivateRoutes path="/logout" exact component={(props) => <LogoutComponent {...props} />} />
      <PrivateRoutes path="/inicio/" exact component={(props) => <IndexHomeComponent {...props} />} />
      <PrivateRoutes path="/paciente/form" exact component={(props) => <PatientHealthForm {...props} />} />
      <PrivateRoutes path="/doctor" exact component={(props) => <DoctorComponent {...props} />} />
      <PrivateRoutes path="/doctor/pacientes" exact component={(props) => <PatientsComponent {...props} />} />
      <PrivateRoutes
        path="/hospital"
        exact
        component={(props) => (
          <HospitalContextProvider>
            <HospitalComponent {...props} />
          </HospitalContextProvider>
        )}
      />
      <Route component={(props) => <PageNotFound {...props} />} />
    </Switch>
  );
}

export default RoutesComponent;
