import { lazy } from 'react';

const PageNotFound = lazy(() => import('../components/NotFoundComponent'));
const LoginComponent = lazy(() => import('../components/login/LoginComponent'));
const HospitalComponent = lazy(() => import('../components/hospital/HospitalComponent'));
const ProfilesComponent = lazy(() => import('../components/profiles/ProfilesComponent'));
const PatientsComponent = lazy(() => import('../components/profiles/patients/PatientsComponent'));
const HomeComponent = lazy(() => import('../components/HomeComponent'));
const PatientHealthForm = lazy(() => import('../components/medicalForms/PatientMedicalForm'));
const PatientHistoryComponent = lazy(() => import('../components/medicalForms/history/PatientHistoryComponent'));
const DoctorPatientHistoryComponent = lazy(() =>
  import('../components/profiles/doctors/DoctorPatientsMedicalHistoryComponent')
);

const TreatmentComponent = lazy(() => import('../components/treatments/TreatmentsComponent'));
const MedicinesComponent = lazy(() => import('../components/medicines/MedicinesComponent'));

const RouteListConfig = [
  {
    path: '/',
    component: HomeComponent,
    label: 'Home',
  },
  {
    path: '/inicio',
    component: HomeComponent,
    label: 'Inicio',
  },
  {
    path: '/login',
    component: LoginComponent,
    label: 'Login',
  },
  {
    path: '/doctor/:idPaciente/historial',
    component: DoctorPatientHistoryComponent,
    label: 'Historial',
    roles: ['octor'],
  },
  {
    path: '/tratamientos',
    component: TreatmentComponent,
    label: 'Tratamientos',
    roles: ['doctor'],
    navegation: true,
  },
  {
    path: '/medicamentos',
    component: MedicinesComponent,
    label: 'Medicamentos',
    roles: ['doctor'],
    navegation: true,
  },
  {
    path: '/:idPaciente/historial',
    component: PatientHistoryComponent,
    label: 'Historial',
    roles: ['patient'],
    navegation: true,
  },
  {
    path: '/paciente/prueba',
    component: PatientHealthForm,
    label: 'Pruebas',
    roles: ['patient'],
    navegation: true,
  },
  {
    path: '/pacientes',
    component: PatientsComponent,
    label: 'Pacientes',
    roles: ['doctor'],
    navegation: true,
  },
  {
    path: '/perfiles',
    component: ProfilesComponent,
    roles: ['admin'],
    label: 'Perfiles',
    navegation: true,
  },
  {
    path: '/hospitales',
    component: HospitalComponent,
    label: 'Hospitales',
    roles: ['admin'],
    navegation: true,
  },
  {
    component: PageNotFound,
  },
];

export default RouteListConfig;
