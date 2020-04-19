import React from 'react';
import { PatientsContextProvider, withPatientsContextProvider } from '../../contexts/PatientsContext';
import PatientsListComponent from './PatientsListCompoent';

function PatientsComponent() {
  return <PatientsListComponent />;
}

export default withPatientsContextProvider(PatientsComponent);
