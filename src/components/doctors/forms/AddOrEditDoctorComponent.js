import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Form } from 'react-final-form';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import HospitalFieldComponent from '../../fields/HospitalFieldComponent';
import { useDoctorsContext } from '../../../contexts/DoctorsContext';
import DoctorAndPatientFields from '../../patients/forms/DoctorAndPatientFields';
import { EDIT_FORM_TEXT } from '../../../commons/globalText';
import UserFieldComponent from '../../fields/UserFieldComponent';

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
      <Form
        initialValues={formType === EDIT_FORM_TEXT && doctorSelected && doctorSelected}
        onSubmit={onSubmit}
        // validate={ValidateDoctorForm}
        render={({ handleSubmit }) => (
          <form autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <DoctorAndPatientFields formType={formType} classes={classes} />
              <Grid item xs={12}>
                <UserFieldComponent classes={classes} />
              </Grid>
              <Grid item xs={12}>
                <HospitalFieldComponent classes={classes} />
              </Grid>

              <Grid item container xs={12} justify="space-evenly">
                <Button variant="contained" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button variant="contained" type="submit" color="primary">
                  Guardar
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      />
    </div>
  );
}
