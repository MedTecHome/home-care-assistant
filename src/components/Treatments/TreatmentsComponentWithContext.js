import React from 'react';
import TreatmentsComponent from './TreatmentsComponent';
import { useAuthContext } from '../../contexts/AuthContext';

const TreatmentsComponentWithContext = ({ children }) => {
  const { currentUserProfile } = useAuthContext();
  return <TreatmentsComponent patient={currentUserProfile}>{children}</TreatmentsComponent>;
};

export default TreatmentsComponentWithContext;
