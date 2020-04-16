import React, { useContext, useEffect } from 'react';
import { HospitalContext } from './context/HospitalContext';
import HospitalListComponent from './HospitalListComponent';

function HospitalComponent() {
  const { FetchHospitals } = useContext(HospitalContext);

  useEffect(() => {
    FetchHospitals({});
  }, []);

  return (
    <>
      <HospitalListComponent />
    </>
  );
}

export default HospitalComponent;
