import React, { useEffect, useState } from 'react';
import { useForm, FormContext } from 'react-hook-form';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { EDIT_FORM_TEXT, REQUIRED_FIELD } from '../../../commons/globalText';
import { usePatientsContext } from '../../../contexts/PatientsContext';
import GenericPatientForm from './GenericPatientForm';

const useStyles = makeStyles(() => ({
  formControl: {
    width: '100%',
  },
  titleForm: {
    color: '#cdcdcd',
  },
}));

function AddOrEditPatienstComponent({ title }) {
  const { savePatientsData, patientSelected, formType, setModalVisible } = usePatientsContext();
  const classes = useStyles();
  const methods = useForm();

  const onSubmit = values => {
    savePatientsData(values, formType);
    setModalVisible(false, null);
  };

  const onCancel = () => {
    setModalVisible(false, null);
  };

  return (
    <div>
      <FormContext {...methods}>
        <form autoComplete="off" onSubmit={methods.handleSubmit(onSubmit)}>
          <Container maxWidth="xs">
            <div className={classes.titleForm}>
              <h4>{title} Paciente</h4>
            </div>
            <Grid container justify="space-around" spacing={3}>
              <GenericPatientForm formType={formType} classes={classes} selected={patientSelected} />
              <Grid item container xs={12} justify="space-evenly">
                <Button variant="contained" onClick={onCancel}>
                  cancelar
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Aceptar
                </Button>
              </Grid>
            </Grid>
          </Container>
        </form>
      </FormContext>
    </div>
  );
}

export default AddOrEditPatienstComponent;
