import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { AuthContextProvider } from '../../contexts/AuthContext';
import RegisterFormComponent from './RegisterFormComponent';

function RegisterComponent() {
  return (
    <Container>
      <Grid container justify="center">
        <Grid item>
          <AuthContextProvider>
            <RegisterFormComponent />
          </AuthContextProvider>
        </Grid>
      </Grid>
    </Container>
  );
}
export default RegisterComponent;
