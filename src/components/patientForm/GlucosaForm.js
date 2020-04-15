import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { useFormContext } from 'react-hook-form';
import { useStyle } from './cssInJs';

function GlucosaForm() {
  const { register, errors } = useFormContext();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const { justifyFlex } = useStyle(theme);

  return (
    <Grid container>
      <h3
        style={{
          marginBlockEnd: 0,
        }}
      >
        GLUCOSA:
      </h3>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={justifyFlex}>
        <TextField
          error={!!errors.concentAzucar}
          type="number"
          inputRef={register({
            required: 'Obligatorio',
          })}
          label={`${matches ? 'Concent.' : 'Concentracion'} de azucar`}
          name="concentAzucar"
          helperText={errors.concentAzucar && errors.concentAzucar.message}
        />
        <TextField
          error={!!errors.medido}
          inputRef={register({
            required: 'Obligatorio',
          })}
          label="Medido"
          name="medido"
          helperText={errors.medido && errors.medido.message}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={justifyFlex}>
        <TextField inputRef={register} multiline label="Nota" name="notasGlucosa" />
      </Grid>
    </Grid>
  );
}

export default GlucosaForm;
