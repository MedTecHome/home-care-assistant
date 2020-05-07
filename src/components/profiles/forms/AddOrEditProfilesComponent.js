import React, { useEffect } from 'react';
import { Field, Form } from 'react-final-form';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { EDIT_FORM_TEXT } from '../../../commons/globalText';
import HospitalFieldComponent from '../../fields/HospitalFieldComponent';
import { useProfilesContext } from '../ProfilesContext';
import PatientsBlockFieldComponent from '../../fields/PatientFieldsComponent';
import RoleFieldComponent from '../../fields/roles/RoleFieldComponent';
import { getProfileByIdAction } from '../reducers/ProfileActions';
import { getRoleByIdAction } from '../../fields/roles/reducers/RoleActions';
import { getHospitalByIdAction } from '../../hospital/reducers/HospitalActions';
import { useAuthContext } from '../../../contexts/AuthContext';
import { DialogTitleComponent } from '../../ModalComponent';
import { useRolesContext, withRolesContext } from '../../fields/roles/RolesContext';
import { validateHospital, validateProfile } from './valdiateProfile';
import CustomTextFieldComponent from '../../inputs/CustomTextFieldComponent';
import SaveButton from '../../buttons/SaveButton';
import { getSexById } from '../../../nomenc/NomSex';

function AddOrEditProfilesComponent({ title }) {
  const { currentUserProfile } = useAuthContext();
  const { selected, saveProfileValues, formType, setModalVisible } = useProfilesContext();
  const { roles, getRoles } = useRolesContext();
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
        ...(values.sex ? { sex: await getSexById(values.sex) } : {}),
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
          formType === EDIT_FORM_TEXT && selected
            ? {
                ...selected,
                ...(selected.user ? { email: selected.user.email } : {}),
                ...(selected.role && roles.length > 0 ? { role: selected.role.id } : { role: '' }),
                ...(selected.doctor ? { doctor: selected.doctor.id } : {}),
                ...(selected.hospital ? { hospital: selected.hospital.id } : {}),
                ...(selected.birthday ? { birthday: selected.birthday.toDate() } : {}),
                ...(selected.sex ? { sex: selected.sex.id } : {}),
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
                  <Grid item xs={12}>
                    <RoleFieldComponent source={roles} userRole={currentUserProfile.role} />
                  </Grid>
                  {formType === EDIT_FORM_TEXT && <Field required name="id" type="hidden" component="input" />}
                  <Grid item xs={12} sm={12} md={12}>
                    <CustomTextFieldComponent required label="Nombre:" name="name" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <CustomTextFieldComponent required label="Apellidos:" name="lastName" />
                  </Grid>
                  <Grid item xs={values.role === 'patient' ? 6 : 12}>
                    <CustomTextFieldComponent type="tel" label="Telefono:" name="phone" />
                  </Grid>
                  {values && values.role === 'patient' && (
                    <PatientsBlockFieldComponent role={currentUserProfile.role} />
                  )}
                  {values && values.role === 'doctor' && (
                    <Grid item xs={12}>
                      <HospitalFieldComponent validate={validateHospital} />
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <CustomTextFieldComponent
                      required
                      name="email"
                      label="Correo"
                      disabled={formType === EDIT_FORM_TEXT}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button disableElevation variant="contained" onClick={handleCancel}>
                  cancelar
                </Button>
                <SaveButton pristine={pristine} invalid={invalid} submitting={submitting} />
              </DialogActions>
            </form>
          );
        }}
      />
    </>
  );
}

export default withRolesContext(AddOrEditProfilesComponent);
