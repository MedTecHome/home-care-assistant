import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { ADD_FORM_TEXT, EDIT_FORM_TEXT, REQUIRED_FIELD } from '../../../commons/globalText';
import { HospitalContext } from '../../../contexts/HospitalContext';

const useStyles = makeStyles(theme => ({
  formControl: {
    width: '100%',
  },
  buttonActions: {
    display: 'flex',
    justifyContent: 'space-around',
  },
}));

export default function AddOrEditHospitalComponent() {
  const { register, errors, handleSubmit, setValue, reset } = useForm();
  const {
    hospitalFormType,
    hospitalsSelected,
    saveHospitalValues,
    fetchHospitals,
    setHospitalModalVisible,
  } = useContext(HospitalContext);
  const classes = useStyles();

  useEffect(() => {
    return () => {
      fetchHospitals({});
      reset();
    };
  }, []);

  useEffect(() => {
    if (hospitalsSelected.length > 0 && hospitalFormType === EDIT_FORM_TEXT) {
      setValue(Object.keys(hospitalsSelected[0]).map(k => ({ [k]: hospitalsSelected[0][k] })));
    }
  }, [hospitalFormType, hospitalsSelected]);

  const handleCancel = () => {
    setHospitalModalVisible(false, null);
  };

  const onSubmit = values => {
    saveHospitalValues(values, hospitalFormType);
    handleCancel();
  };

  return (
    <div>
      <h3>{hospitalFormType === ADD_FORM_TEXT ? 'Adicionar' : 'Editar'} hospital</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {hospitalsSelected.length > 0 && hospitalFormType === EDIT_FORM_TEXT && (
          <input type="hidden" ref={register} name="id" />
        )}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl className={classes.formControl} error={!!errors.name}>
              <InputLabel>Nombre hospital</InputLabel>
              <Input
                inputRef={register({
                  required: REQUIRED_FIELD,
                })}
                aria-describedby="Nombre del hospital"
                name="name"
              />
              <FormHelperText id="my-helper-text">
                {errors.name ? errors.name.message : 'Ej: Hospital Clinico Quirurgico Rafael Zodiac'}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.formControl} error={!!errors.address}>
              <InputLabel>Direccion</InputLabel>
              <Input inputRef={register} aria-describedby="Direccion del hospital" name="address" />
              <FormHelperText>{errors.address ? errors.address.message : 'Ej: da sdasda'}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.formControl} error={!!errors.phone}>
              <InputLabel>Telefono</InputLabel>
              <Input
                inputRef={register({
                  pattern: /([+]\d{3}?)|(\d{3}-\d{4})/ || 'Formato de telefono no valido',
                })}
                aria-describedby="Telefono del hospital"
                name="phone"
              />
              <FormHelperText>{errors.phone ? errors.phone.message : 'Ej: 4545424424'}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item container spacing={5}>
            <Grid item xs={12} sm={6} lg={4}>
              <FormControl className={classes.formControl} error={!!errors.maxDoctors}>
                <InputLabel htmlFor="hospital-name">Limite doctores</InputLabel>
                <Input
                  type="number"
                  inputProps={{
                    defaultValue: 20,
                    min: 0,
                  }}
                  inputRef={register({
                    required: REQUIRED_FIELD,
                  })}
                  aria-describedby="Limite de doctores del hospital"
                  name="maxDoctors"
                />
                <FormHelperText>{errors.maxDoctors ? errors.maxDoctors.message : 'Ej: 12'}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <FormControl className={classes.formControl} error={!!errors.maxPatients}>
                <InputLabel>Limite Pacientes</InputLabel>
                <Input
                  type="number"
                  inputProps={{
                    defaultValue: 20,
                    min: 0,
                  }}
                  inputRef={register({
                    required: REQUIRED_FIELD,
                  })}
                  aria-describedby="Limite pacientes hospital"
                  name="maxPatients"
                />
                <FormHelperText>{errors.maxPatients ? errors.maxPatients.message : 'Ej: 12'}</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item className={classes.buttonActions} xs={12}>
            <Button variant="contained" onClick={handleCancel}>
              cancelar
            </Button>
            <Button variant="contained" type="submit" color="primary">
              guardar
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
