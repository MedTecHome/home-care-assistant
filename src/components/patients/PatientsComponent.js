import React from 'react';
import { PatientsContextProvider } from '../../contexts/PatientsContext';
import PatientsListComponent from './PatientsListCompoent';

export default function PatientsComponent() {
  return (
    <PatientsContextProvider>
      <PatientsListComponent />
    </PatientsContextProvider>
  );
}
