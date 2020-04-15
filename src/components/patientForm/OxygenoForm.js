import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useFormContext } from 'react-hook-form';

function OxygenoForm() {
  const { register, errors } = useFormContext();
  return (
    <Grid container>
      <h3
        style={{
          marginBlockEnd: 0,
        }}
      >
        OXIGENO:
      </h3>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        Oxigeno
      </Grid>
    </Grid>
  );
}

export default OxygenoForm;
