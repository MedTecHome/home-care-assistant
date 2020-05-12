import { lazy } from 'react';

const PageNotFound = lazy(() => import('../components/NotFoundComponent'));
const LoginComponent = lazy(() => import('../components/login/LoginComponent'));
const HospitalComponent = lazy(() => import('../components/hospital/HospitalComponent'));
const ProfilesComponent = lazy(() => import('../components/profiles/ProfilesComponent'));
const PatientsComponent = lazy(() => import('../components/profiles/patients/PatientsComponent'));
const HomeComponent = lazy(() => import('../components/HomeComponent'));
const HomeInfoComponent = lazy(() => import('../components/HomeInfoComponent'));
const PatientHealthForm = lazy(() => import('../components/medicalForms/PatientMedicalForm'));
const PatientClinicalDetailsComponent = lazy(() =>
  import('../components/patientclinicaldetails/PatientClinicalDetailsComponent')
);
const MedicinesComponent = lazy(() => import('../components/medicines/MedicinesComponent'));

const RouteListConfig = [
  {
    path: '/',
    redirectTo: HomeComponent,
    label: 'Home'
  },
  {
    path: '/inicio',
    component: HomeInfoComponent,
    label: 'Inicio',
    roles: ['admin', 'clinic', 'doctor', 'patient']
  },
  {
    path: '/login',
    component: LoginComponent,
    label: 'Login'
  },
  {
    path: '/perfiles',
    component: ProfilesComponent,
    roles: ['admin', 'clinic'],
    label: 'Perfiles',
    navegation: true
  },
  {
    path: '/hospitales',
    component: HospitalComponent,
    label: 'Hospitales',
    roles: ['admin'],
    navegation: true
  },
  {
    path: '/pacientes',
    component: PatientsComponent,
    label: 'Pacientes',
    roles: ['doctor'],
    navegation: true
  },
  {
    path: '/medicamentos',
    component: MedicinesComponent,
    label: 'Medicamentos',
    roles: ['doctor'],
    navegation: true
  },
  {
    path: '/prueba/medica',
    component: PatientHealthForm,
    label: 'Pruebas',
    roles: ['patient'],
    navegation: true
  },
  {
    path: '/detallesclinicos',
    component: PatientClinicalDetailsComponent,
    label: 'Detalles clínicos',
    roles: ['patient', 'doctor'],
    navigation: ['patient']
  },
  {
    component: PageNotFound
  }
];

export default RouteListConfig;
