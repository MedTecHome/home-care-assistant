import React from 'react';
import { Grid } from '@material-ui/core';
import CustomTextFieldComponent from '../inputs/CustomTextFieldComponent';

function ClinicBlockFieldComponent() {
  return (
    <>
      <Grid item xs={12} sm={6} md={6}>
        <CustomTextFieldComponent
          required
          type="number"
          label="Límite de doctores"
          name="maxDoctors"
          textAlign="right"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <CustomTextFieldComponent
          required
          type="number"
          label="Límite de pacientes"
          name="maxPatients"
          textAlign="right"
        />
      </Grid>
    </>
  );
}

export default ClinicBlockFieldComponent;
