import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { AuthContext } from './context/AuthContext';

function LoginComponent() {
  const { register, errors, handleSubmit } = useForm();
  const { signInUser } = useContext(AuthContext);

  const onSubmit = (value) => {
    signInUser(value);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
        <Grid item xs={12}>
          <TextField
            type="email"
            size="small"
            variant="outlined"
            error={!!errors.email}
            inputRef={register({
              required: 'Obligatorio',
            })}
            label="Correo"
            name="email"
            helperText={errors.email && errors.email.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="password"
            size="small"
            variant="outlined"
            error={!!errors.password}
            inputRef={register({
              required: 'Obligatorio',
            })}
            label="Contraseña"
            name="password"
            helperText={errors.password && errors.password.message}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" color="primary" variant="contained">
            Acceder
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default LoginComponent;
