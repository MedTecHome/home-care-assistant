import React from 'react';
import { HospitalContextProvider } from '../../contexts/HospitalContext';
import HospitalListComponent from './HospitalListComponent';
import ModalHospitalComponent from './ModalHospitalComponent';
import HospitalForms from './forms/HospitalForms';

function HospitalComponent() {
  return (
    <HospitalContextProvider>
      <ModalHospitalComponent>
        <HospitalForms />
      </ModalHospitalComponent>
      <HospitalListComponent />
    </HospitalContextProvider>
  );
}

export default HospitalComponent;
