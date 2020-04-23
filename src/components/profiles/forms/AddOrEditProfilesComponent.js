import React from 'react';
import { Field, Form } from 'react-final-form';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { EDIT_FORM_TEXT } from '../../../commons/globalText';
import UserFieldComponent from '../../fields/UserFieldComponent';
import HospitalFieldComponent from '../../fields/HospitalFieldComponent';
import { useProfilesContext } from '../../../contexts/ProfilesContext';
import NameFieldComponent from '../../fields/NameFieldComponent';
import LastNameFieldComponent from '../../fields/LastNameFieldComponent';
import PhoneFieldComponent from '../../fields/PhoneFieldComponent';
import PatientsFieldComponent from '../../fields/PatientFieldsComponent';
import RoleFieldComponent from '../../fields/RoleFieldComponent';

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

function AddOrEditProfilesComponent({ title }) {
  const { profileSelected, saveProfileValues, formType, setModalVisible } = useProfilesContext();
  const classes = useStyles();

  console.log('renderin form AddOrEditProfilesComponent');

  const onSubmit = values => {
    saveProfileValues({ ...values, birthday: moment(values.birthday).toDate() }, formType);
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
        initialValues={
          formType === EDIT_FORM_TEXT &&
          profileSelected && { ...profileSelected, birthday: profileSelected.birthday.toDate() }
        }
        onSubmit={onSubmit}
        // validate={ValidateDoctorForm}
        render={({ handleSubmit, values }) => (
          <form autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {formType === EDIT_FORM_TEXT && <Field required name="id" type="hidden" component="input" />}
              <Grid item xs={12} sm={12} md={12}>
                <NameFieldComponent classes={classes} />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <LastNameFieldComponent classes={classes} />
              </Grid>
              <Grid item xs={12}>
                <PhoneFieldComponent classes={classes} />
              </Grid>
              {values.roleId && values.roleId === 'patient' && <PatientsFieldComponent classes={classes} />}
              {values.roleId && values.roleId === 'doctor' && (
                <Grid item xs={12}>
                  <HospitalFieldComponent classes={classes} />
                </Grid>
              )}
              <Grid item xs={12}>
                <UserFieldComponent classes={classes} />
              </Grid>
              <Grid item xs={12}>
                <RoleFieldComponent classes={classes} />
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

export default AddOrEditProfilesComponent;
