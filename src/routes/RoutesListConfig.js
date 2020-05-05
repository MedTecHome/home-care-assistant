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
    path: '/doctor/paciente/historial',
    component: DoctorPatientHistoryComponent,
    roles: ['doctor'],
  },
  {
    path: '/tratamientos',
    component: TreatmentComponent,
    roles: ['doctor'],
  },
  {
    path: '/medicamentos',
    component: MedicinesComponent,
    roles: ['doctor'],
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
    roles: ['doctor'],
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
