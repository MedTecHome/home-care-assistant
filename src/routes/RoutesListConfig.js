import { lazy } from 'react';

const PageNotFound = lazy(() => import('../components/NotFoundComponent'));
const LoginComponent = lazy(() => import('../components/Login/LoginComponent'));
const HospitalComponent = lazy(() => import('../components/Hospital/HospitalComponent'));
const ProfilesComponent = lazy(() => import('../components/Profiles/ProfilesComponent'));
const PatientsComponent = lazy(() => import('../components/Profiles/patients/PatientsComponent'));
const MonitoringComponent = lazy(() => import('../components/monitoring/MonitoringComponent'));
const DoctorsComponent = lazy(() => import('../components/Profiles/doctors/DoctorsComponent'));
const HomeComponent = lazy(() => import('../components/HomeComponent'));
const HomeInfoComponent = lazy(() => import('../components/HomeInfoComponent'));
const PatientHealthForm = lazy(() => import('../components/MedicalForms/PatientMedicalForm'));
const PatientClinicalDetailsComponent = lazy(() =>
  import('../components/Patientclinicaldetails/PatientClinicalDetailsComponent')
);
const TreatmentsComponentWithContext = lazy(() => import('../components/Treatments/TreatmentsComponentWithContext'));
const MedicinesComponent = lazy(() => import('../components/Medicines/MedicinesComponent'));

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
    path: '/Login',
    component: LoginComponent,
    label: 'Login'
  },
  {
    path: '/perfiles',
    component: ProfilesComponent,
    roles: ['admin'],
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
    path: '/doctores',
    component: DoctorsComponent,
    roles: ['clinic'],
    label: 'Doctores',
    navegation: true
  },
  {
    path: '/monitorear',
    component: MonitoringComponent,
    label: 'Monitorear',
    roles: ['doctor'],
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
    label: 'Entrada de parámetros',
    roles: ['patient'],
    navegation: true
  },
  {
    path: '/historial',
    component: PatientClinicalDetailsComponent,
    label: 'Detalles clínicos',
    roles: ['patient', 'doctor'],
    navegation: ['patient']
  },
  {
    path: '/tratamientos',
    component: TreatmentsComponentWithContext,
    label: 'Tratamientos',
    roles: ['patient'],
    navegation: ['patient']
  },
  {
    component: PageNotFound
  }
];

export default RouteListConfig;
