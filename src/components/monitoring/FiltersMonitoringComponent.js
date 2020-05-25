import React, { useEffect } from 'react';
import { useMonitoringContext } from './MonitoringContext';

function FiltersMonitoringComponent({ currentUserProfile }) {
  const { setFilters } = useMonitoringContext();

  useEffect(() => {
    if (currentUserProfile) setFilters({ 'doctor.id': currentUserProfile.id });
  }, [setFilters, currentUserProfile]);

  return <></>;
}

export default FiltersMonitoringComponent;
