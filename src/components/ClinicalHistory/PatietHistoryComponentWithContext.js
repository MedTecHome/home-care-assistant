import React from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import PatientHistoryComponent from './PatientHistoryComponent';

const PatietHistoryComponentWithContext = ({ children }) => {
  const { currentUserProfile } = useAuthContext();
  return <PatientHistoryComponent patient={currentUserProfile}>{children}</PatientHistoryComponent>;
};

export default PatietHistoryComponentWithContext;
