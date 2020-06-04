import React, { useEffect } from 'react';
import { useMonitoringContext } from './MonitoringContext';

function FiltersMonitoringComponent({ currentUserProfile }) {
  const { setParams } = useMonitoringContext();

  useEffect(() => {
    if (currentUserProfile) setParams({ parent: currentUserProfile.id });
  }, [setParams, currentUserProfile]);

  return <div />;
}

export default FiltersMonitoringComponent;
