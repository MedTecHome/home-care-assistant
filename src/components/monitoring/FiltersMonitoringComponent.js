import React, { useEffect } from 'react';
import { useMonitoringContext } from './MonitoringContext';

function FiltersMonitoringComponent({ currentUserProfile }) {
  const { setParams } = useMonitoringContext();

  useEffect(() => {
    if (currentUserProfile) setParams({ 'doctor.id': currentUserProfile.id });
  }, [setParams, currentUserProfile]);

  return <></>;
}

export default FiltersMonitoringComponent;
