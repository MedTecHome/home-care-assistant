import React from 'react';
import { withPatientsContextProvider } from '../../../contexts/PatientsContext';

function EditPatiensComponent() {
  return <div>edit</div>;
}

export default withPatientsContextProvider(EditPatiensComponent);
