import React, { useEffect } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { useMonitoringContext } from './MonitoringContext';

function FiltersMonitoringComponent() {
  const { setFilters } = useMonitoringContext();
  const { currentUserProfile } = useAuthContext();

  useEffect(() => {
    if (currentUserProfile) setFilters({ 'doctor.id': currentUserProfile.id });
  }, [setFilters, currentUserProfile]);

  return <></>;
}

export default FiltersMonitoringComponent;
