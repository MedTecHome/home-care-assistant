import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

function HomeInfoComponent() {
  const { isDoctor, isPatient, isClinic } = useAuthContext();

  return (
    <>
      <Grid container spacing={3}>
        {isPatient && <Redirect to="/prueba/medica" />}
        {isDoctor && <Redirect to="/monitorear" />}
        {isClinic && <Redirect to="/doctores" />}
      </Grid>
    </>
  );
}

export default HomeInfoComponent;
