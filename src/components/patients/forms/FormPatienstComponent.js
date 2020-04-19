import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { isEmpty, values } from 'ramda';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { EDIT_FORM_TEXT, REQUIRED_FIELD } from '../../../commons/globalText';
import { dbFirebase } from '../../../firebaseConfig';

const useStyles = makeStyles(() => ({
  formControl: {
    width: '100%',
  },
  titleForm: {
    color: '#cdcdcd',
  },
}));

function FormPatientsComponent({ selectedPatients, formType, onSubmit, onCancel }) {
  const [birthday, setBirthday] = useState(Date.now);
  const classes = useStyles();
  const { register, setValue, handleSubmit, reset, errors } = useForm();

  useEffect(() => {
    register({ name: 'birthday' }, { required: REQUIRED_FIELD });
    return () => {
      reset();
    };
  }, []);

  useEffect(() => {
    setValue([{ birthday: birthday ? moment(birthday).toDate() : birthday }]);
  }, [birthday]);

  useEffect(() => {
    if (!isEmpty(selectedPatients) && formType === EDIT_FORM_TEXT) {
      setValue([]);
    }
  }, [selectedPatients, formType]);

  return (
    <div>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Container maxWidth="xs">
          <div className={classes.titleForm}>
            <h2>Adicionar Paciente</h2>
          </div>
          <Grid container justify="space-around" spacing={3}>
            <Grid item xs={12} sm={12} md={12}>
              <FormControl className={classes.formControl} error={!!errors.name}>
                <TextField
                  size="small"
                  inputRef={register({
                    required: REQUIRED_FIELD,
                  })}
                  error={!!errors.name}
                  label="Nombre:"
                  helperText={errors.name ? errors.name.message : ''}
                  variant="outlined"
                  name="name"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <FormControl size="small" className={classes.formControl} error={!!errors.lastName}>
                <TextField
                  size="small"
                  inputRef={register({
                    required: REQUIRED_FIELD,
                  })}
                  error={!!errors.lastName}
                  label="Apellidos:"
                  helperText={errors.lastName ? errors.lastName.message : ''}
                  variant="outlined"
                  name="lastName"
                />
              </FormControl>
            </Grid>
            <Grid item xs={8} sm={8} md={8}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <FormControl className={classes.formControl} error={!!errors.birthday}>
                  <DatePicker
                    error={!!errors.birthday}
                    label="Fecha de nacimiento"
                    size="small"
                    variant="inline"
                    value={birthday}
                    onChange={setBirthday}
                    animateYearScrolling
                    format="DD/MM/YYYY"
                    inputVariant="outlined"
                    name="birthday"
                    helperText={errors.birthday ? errors.birthday.message : ''}
                  />
                </FormControl>
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <FormControl className={classes.formControl} error={!!errors.height}>
                <TextField
                  size="small"
                  type="number"
                  inputRef={register({
                    required: REQUIRED_FIELD,
                  })}
                  error={!!errors.height}
                  label="Estatura:"
                  helperText={errors.height ? errors.height.message : ''}
                  variant="outlined"
                  name="height"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl className={classes.formControl} error={!!errors.address}>
                <TextField
                  size="small"
                  inputRef={register({
                    required: REQUIRED_FIELD,
                  })}
                  error={!!errors.address}
                  label="Direccion:"
                  helperText={errors.address ? errors.address.message : ''}
                  variant="outlined"
                  name="address"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl className={classes.formControl} error={!!errors.phone}>
                <TextField
                  size="small"
                  type="number"
                  inputRef={register({
                    required: REQUIRED_FIELD,
                  })}
                  error={!!errors.phone}
                  label="Telefono:"
                  helperText={errors.phone ? errors.phone.message : ''}
                  variant="outlined"
                  name="phone"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl className={classes.formControl} error={!!errors.userId}>
                <TextField
                  size="small"
                  inputRef={register({
                    required: REQUIRED_FIELD,
                  })}
                  error={!!errors.userId}
                  label="Usuario:"
                  helperText={errors.userId ? errors.userId.message : ''}
                  variant="outlined"
                  name="userId"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl className={classes.formControl} error={!!errors.doctorId}>
                <TextField
                  size="small"
                  inputRef={register({
                    required: REQUIRED_FIELD,
                  })}
                  error={!!errors.doctorId}
                  label="Doctor:"
                  helperText={errors.doctorId ? errors.doctorId.message : ''}
                  variant="outlined"
                  name="doctorId"
                />
              </FormControl>
            </Grid>
            <Grid item container xs={12} justify="space-evenly">
              <Button variant="outlined" onClick={onCancel}>
                cancelar
              </Button>
              <Button type="submit" variant="outlined" color="primary">
                Aceptar
              </Button>
            </Grid>
          </Grid>
        </Container>
      </form>
    </div>
  );
}

export default FormPatientsComponent;
