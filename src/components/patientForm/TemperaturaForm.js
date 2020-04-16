import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { useFormContext } from 'react-hook-form';
import { useTheme } from '@material-ui/core/styles';
import useStyle from './cssInJs';

function TemperaturaForm() {
  const { register, errors } = useFormContext();
  const theme = useTheme();
  const { justifyFlex } = useStyle(theme);

  return (
    <Grid container>
      <h3
        style={{
          marginBlockEnd: 0,
        }}
      >
        TEMPERATURA:
      </h3>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={justifyFlex}>
        <TextField
          error={!!errors.gradosCelcius}
          inputRef={register({
            required: 'Obligatorio',
          })}
          label="Grados Celcius"
          name="gradosCelcius"
          helperText={errors.gradosCelcius && errors.gradosCelcius.message}
        />
        <TextField inputRef={register} label="Nota" name="notasTemperatura" />
      </Grid>
    </Grid>
  );
}

export default TemperaturaForm;
