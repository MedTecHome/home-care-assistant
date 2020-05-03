import React, { useEffect } from 'react';
import { Field, Form } from 'react-final-form';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { EDIT_FORM_TEXT } from '../../../commons/globalText';
import HospitalFieldComponent from '../../fields/HospitalFieldComponent';
import { useProfilesContext } from '../ProfilesContext';
import NameFieldComponent from '../../fields/NameFieldComponent';
import LastNameFieldComponent from '../../fields/LastNameFieldComponent';
import PhoneFieldComponent from '../../fields/PhoneFieldComponent';
import PatientsFieldComponent from '../../fields/PatientFieldsComponent';
import RoleFieldComponent from '../../fields/roles/RoleFieldComponent';
import { getProfileByIdAction } from '../reducers/ProfileActions';
import { getRoleByIdAction } from '../../fields/roles/reducers/RoleActions';
import { getHospitalByIdAction } from '../../hospital/reducers/HospitalActions';
import EmailFieldComponent from '../../fields/EmailFieldComponent';
import { useAuthContext } from '../../../contexts/AuthContext';
import { DialogTitleComponent } from '../../ModalComponent';
import { useRolesContext, withRolesContext } from '../../fields/roles/RolesContext';
import { validateHospital, validateProfile } from './valdiateProfile';

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
  wrapper: {
    position: 'relative',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

function AddOrEditProfilesComponent({ title }) {
  const { currentUserProfile } = useAuthContext();
  const { profileSelected, saveProfileValues, formType, setModalVisible } = useProfilesContext();
  const { roles, getRoles } = useRolesContext();
  const classes = useStyles();

  useEffect(() => {
    getRoles();
  }, [getRoles]);

  const onSubmit = async ({ user, ...values }) => {
    await saveProfileValues(
      {
        ...values,
        ...(values.birthday ? { birthday: moment(values.birthday).toDate() } : {}),
        ...(values.doctor ? { doctor: await getProfileByIdAction(values.doctor, ['fullname']) } : {}),
        ...(values.role ? { role: await getRoleByIdAction(values.role) } : {}),
        ...(values.hospital ? { hospital: await getHospitalByIdAction(values.hospital, ['name']) } : {}),
      },
      formType
    );
    setModalVisible(false, null);
  };

  const handleCancel = () => {
    setModalVisible(false, null);
  };

  return (
    <>
      <DialogTitleComponent onClose={handleCancel}>{title}</DialogTitleComponent>
      <Form
        initialValues={
          formType === EDIT_FORM_TEXT && profileSelected
            ? {
                ...profileSelected,
                ...(profileSelected.user ? { email: profileSelected.user.email } : {}),
                ...(profileSelected.role && roles.length > 0 ? { role: profileSelected.role.id } : { role: '' }),
                ...(profileSelected.doctor ? { doctor: profileSelected.doctor.id } : {}),
                ...(profileSelected.hospital ? { hospital: profileSelected.hospital.id } : {}),
                ...(profileSelected.birthday ? { birthday: profileSelected.birthday.toDate() } : {}),
              }
            : currentUserProfile && currentUserProfile.role.id === 'doctor' && { doctor: currentUserProfile.id }
        }
        validate={validateProfile}
        onSubmit={onSubmit}
        render={({ handleSubmit, values, form, submitting, pristine, invalid, hasValidationErrors }) => {
          return (
            <form
              autoComplete="off"
              onSubmit={event => {
                if (!hasValidationErrors) {
                  handleSubmit(event).then(() => {
                    form.reset();
                  });
                }
              }}
            >
              <DialogContent dividers>
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
                  <Grid item xs={12}>
                    <RoleFieldComponent source={roles} classes={classes} userRole={currentUserProfile.role} />
                  </Grid>
                  {values && values.role === 'patient' && (
                    <PatientsFieldComponent classes={classes} userRole={currentUserProfile.role} />
                  )}
                  {values && values.role === 'doctor' && (
                    <Grid item xs={12}>
                      <HospitalFieldComponent classes={classes} validate={validateHospital} />
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <EmailFieldComponent disabled={formType === EDIT_FORM_TEXT} classes={classes} />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button disableElevation variant="contained" onClick={handleCancel}>
                  Cancel
                </Button>
                <div className={classes.wrapper}>
                  <Button
                    disabled={submitting || pristine || invalid}
                    disableElevation
                    variant="contained"
                    type="submit"
                    color="primary"
                  >
                    Guardar
                  </Button>
                  {submitting && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
              </DialogActions>
            </form>
          );
        }}
      />
    </>
  );
}

export default withRolesContext(AddOrEditProfilesComponent);
