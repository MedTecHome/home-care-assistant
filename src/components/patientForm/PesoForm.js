import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { useFormContext } from 'react-hook-form';

function PesoForm() {
  const { register, errors } = useFormContext();
  return (
    <Grid container>
      <h3
        style={{
          marginBlockEnd: 0,
        }}
      >
        PESO:
      </h3>
      <Grid item xs={12}>
        <TextField
          error={!!errors.peso}
          inputRef={register({
            required: 'Obligatorio',
          })}
          type="number"
          label="Peso"
          name="peso"
          helperText={errors.peso && errors.peso.message}
        />
      </Grid>
    </Grid>
  );
}

export default PesoForm;
