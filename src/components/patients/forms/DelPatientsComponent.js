import React from 'react';
import { withPatientsContextProvider } from '../../../contexts/PatientsContext';

function DelPatiensComponent() {
  return <div>del</div>;
}

export default withPatientsContextProvider(DelPatiensComponent);
