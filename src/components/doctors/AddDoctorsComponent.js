import React, { useEffect } from 'react';
import { useDoctorsContext, useDoctorsContextProvider } from '../../contexts/DoctorsContext';

function AddDoctorsComponent() {
  const { doctors } = useDoctorsContext();
  return <div />;
}

export default useDoctorsContextProvider(AddDoctorsComponent);
