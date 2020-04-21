import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { FormContext, useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import { useDoctorsContext } from '../../../contexts/DoctorsContext';
import { EDIT_FORM_TEXT, REQUIRED_FIELD } from '../../../commons/globalText';
import GenericPatientForm from '../../patients/forms/GenericPatientForm';

const useStyles = makeStyles({
  root: {
    marginTop: 10,
  },
  headerStyle: {
    color: '#6c6c6c',
  },
  formControl: {
    width: '100%',
  },
});

export default function AddOrEditDoctorComponent({ title }) {
  const { doctorSelected, saveDoctorValues, formType, setModalVisible } = useDoctorsContext();
  const methods = useForm();
  const classes = useStyles();

  const onSubmit = values => {
    saveDoctorValues(values, formType);
    setModalVisible(false, null);
  };

  const handleCancel = () => {
    setModalVisible(false, null);
  };

  return (
    <div className={classes.root}>
      <div className={classes.headerStyle}>
        <h4>{title} Doctor</h4>
      </div>
      <FormContext {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid container justify="space-around" spacing={3}>
            <GenericPatientForm formType={formType} classes={classes} selected={doctorSelected} />
            <Grid item xs={12} sm={12} md={12}>
              <FormControl className={classes.formControl}>
                <TextField
                  size="small"
                  error={!!methods.errors.hospitalId}
                  label="Hospital"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  inputRef={methods.register({
                    required: REQUIRED_FIELD,
                  })}
                  name="hospitalId"
                />
              </FormControl>
            </Grid>
            <Grid item container xs={12} justify="space-evenly">
              <Button variant="contained" onClick={handleCancel}>
                cancelar
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Aceptar
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormContext>
    </div>
  );
}
