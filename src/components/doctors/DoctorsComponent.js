import React from 'react';
import { useDoctorsContextProvider } from '../../contexts/DoctorsContext';
import DoctorsListComponent from './DoctorsListComponent';

function DoctorsComponent() {
  return (
    <>
      <DoctorsListComponent />
    </>
  );
}

export default useDoctorsContextProvider(DoctorsComponent);
