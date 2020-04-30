import { lazy } from 'react';

const PageNotFound = lazy(() => import('../components/NotFoundComponent'));
const LoginComponent = lazy(() => import('../components/login/LoginComponent'));
const HospitalComponent = lazy(() => import('../components/hospital/HospitalComponent'));
const ProfilesComponent = lazy(() => import('../components/profiles/ProfilesComponent'));
const PatientsComponent = lazy(() => import('../components/patients/PatientsComponent'));
const HomeComponent = lazy(() => import('../components/HomeComponent'));
const PatientHealthForm = lazy(() => import('../components/medicalForms/PatientMedicalForm'));
const PatientHistoryComponent = lazy(() => import('../components/medicalForms/history/PatientHistoryComponent'));

const RouteListConfig = [
  {
    path: '/',
    component: HomeComponent,
  },
  {
    path: '/inicio',
    component: HomeComponent,
  },
  {
    path: '/login',
    component: LoginComponent,
  },
  {
    path: '/paciente/historial',
    component: PatientHistoryComponent,
    roles: ['patient'],
  },
  {
    path: '/paciente/form',
    component: PatientHealthForm,
    roles: ['patient'],
  },
  {
    path: '/pacientes',
    component: PatientsComponent,
    roles: ['admin', 'doctor'],
  },
  {
    path: '/perfiles',
    component: ProfilesComponent,
    roles: ['admin'],
  },
  {
    path: '/hospitales',
    component: HospitalComponent,
    roles: ['admin'],
  },
  {
    component: PageNotFound,
  },
];

export default RouteListConfig;
