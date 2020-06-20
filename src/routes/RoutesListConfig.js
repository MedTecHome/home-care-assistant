import { lazy } from 'react';

const PageNotFound = lazy(() => import('../components/NotFoundComponent'));
const LoginComponent = lazy(() => import('../components/Login/LoginComponent'));
const ProfilesComponent = lazy(() => import('../components/Profiles/ProfilesComponent'));
const ClinicsComponent = lazy(() => import('../components/Profiles/clinics/ClinicsComponent'));
const DoctorsComponent = lazy(() => import('../components/Profiles/doctors/DoctorsComponent'));
const PatientsComponent = lazy(() => import('../components/Profiles/patients/PatientsComponent'));
const MonitoringComponent = lazy(() => import('../components/Monitoring/MonitoringComponent'));
// const HomeComponent = lazy(() => import('../components/HomeComponent'));
const HomeInfoComponent = lazy(() => import('../components/HomeInfoComponent'));
const PatientHealthForm = lazy(() => import('../components/MedicalForms/PatientMedicalForm'));
const PatietHistoryComponentWithContext = lazy(() =>
  import('../components/ClinicalHistory/PatietHistoryComponentWithContext')
);
const PatientClinicalDetailsComponent = lazy(() =>
  import('../components/Patientclinicaldetails/PatientClinicalDetailsComponent')
);
const TreatmentsComponentWithContext = lazy(() => import('../components/Treatments/TreatmentsComponentWithContext'));
const MedicinesComponent = lazy(() => import('../components/Medicines/MedicinesComponent'));

const RouteListConfig = [
  {
    path: '/',
    redirectTo: LoginComponent,
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
    roles: ['superadmin'],
    label: 'Perfiles',
    navegation: true
  },
  {
    path: '/clinicas',
    component: ClinicsComponent,
    roles: ['admin'],
    label: 'Clinicas',
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
    label: 'Panel General',
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
    path: '/prueba/medica',
    component: PatientHealthForm,
    label: 'Entrada de parámetros',
    roles: ['patient'],
    navegation: true
  },
  {
    path: '/historial',
    component: PatietHistoryComponentWithContext,
    label: 'Historial',
    roles: ['patient'],
    navegation: ['patient']
  },
  {
    path: '/detallesclinicos',
    component: PatientClinicalDetailsComponent,
    label: 'Detalles clínicos',
    roles: ['doctor'],
    navegation: ['doctor']
  },
  {
    path: '/medicamentos',
    component: MedicinesComponent,
    label: 'Medicamentos',
    roles: ['doctor'],
    navegation: true
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
