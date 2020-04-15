import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { useFormContext } from 'react-hook-form';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useStyle } from './cssInJs';

function GlucosaForm() {
  const { register, setValue, errors } = useFormContext();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const { justifyFlex } = useStyle(theme);

  useEffect(() => {
    register({ name: 'medido' }, { required: 'Obligatorio' });
  }, [register]);

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
        <FormControl error={!!errors.medido}>
          <InputLabel id="demo-simple-select-label">Medido</InputLabel>
          <Select name="medido2" name="test" onChange={(e) => setValue('medido', e.target.value)}>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <FormHelperText>{errors.medido && errors.medido.message}</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={justifyFlex}>
        <TextField inputRef={register} multiline label="Nota" name="notasGlucosa" />
      </Grid>
    </Grid>
  );
}

export default GlucosaForm;
