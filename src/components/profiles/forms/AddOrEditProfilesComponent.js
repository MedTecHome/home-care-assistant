import React from 'react';
import { Field, Form } from 'react-final-form';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { EDIT_FORM_TEXT } from '../../../commons/globalText';
import HospitalFieldComponent from '../../fields/HospitalFieldComponent';
import { useProfilesContext } from '../ProfilesContext';
import PatientsBlockFieldComponent from '../../fields/PatientFieldsComponent';
import RoleFieldComponent from '../../fields/roles/RoleFieldComponent';
import { useAuthContext } from '../../../contexts/AuthContext';
import { DialogTitleComponent } from '../../ModalComponent';
import { withRolesContext } from '../../fields/roles/RolesContext';
import { validateHospital, validateProfile } from './valdiateProfile';
import CustomTextFieldComponent from '../../inputs/CustomTextFieldComponent';
import SaveButton from '../../buttons/SaveButton';
import CheckboxesFieldComponent from '../../fields/CheckboxesFieldComponent';
import listAccess from '../../../commons/access';
import { extractValues, getPropValue } from '../../../helpers/utils';

function AddOrEditProfilesComponent({ title }) {
  const { currentUserProfile } = useAuthContext();
  const { selected, saveProfileValues, formType, setModalVisible } = useProfilesContext();
  const authRole = getPropValue(currentUserProfile, 'role.id') || null;

  const onSubmit = async (values, forms) => {
    const newValues = extractValues(forms.getState().dirtyFields, values);
    await saveProfileValues({ ...newValues, id: values.id }, formType);
    setModalVisible(false, null);
  };

  const handleCancel = () => {
    setModalVisible(false, null);
  };

  return (
    <>
      <DialogTitleComponent onClose={handleCancel}>{title}</DialogTitleComponent>
      <Form
        initialValues={{
          phoneVisible: false,
          emailVisible: false,
          hospital: getPropValue(currentUserProfile, 'hospital.id'),
          role: listAccess[authRole][0],
          ...(formType === EDIT_FORM_TEXT && selected
            ? {
                ...selected,
                ...(selected.user ? { user: selected.user.email } : {}),
                ...(selected.role ? { role: selected.role.id } : {}),
                ...(selected.doctor ? { doctor: selected.doctor.id } : {}),
                ...(selected.hospital ? { hospital: selected.hospital.id } : {}),
                ...(selected.birthday ? { birthday: selected.birthday.toDate() } : {}),
                ...(selected.sex ? { sex: selected.sex.id } : {})
              }
            : currentUserProfile && currentUserProfile.role.id === 'doctor' && { doctor: currentUserProfile.id })
        }}
        validate={validateProfile}
        onSubmit={onSubmit}
        render={({ handleSubmit, values, form, submitting, pristine, invalid }) => {
          return (
            <form
              autoComplete="off"
              onSubmit={event => {
                if (!invalid) {
                  handleSubmit(event).then(() => {
                    form.reset();
                  });
                }
              }}
            >
              <DialogContent dividers>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <RoleFieldComponent disabled={listAccess[authRole].length === 1} userRole={authRole} />
                  </Grid>
                  {formType === EDIT_FORM_TEXT && <Field required name="id" type="hidden" component="input" />}
                  <Grid item xs={12} sm={12} md={12}>
                    <CustomTextFieldComponent required label="Nombre:" name="name" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <CustomTextFieldComponent required label="Apellidos:" name="lastName" />
                  </Grid>
                  <Grid item xs={9}>
                    <CustomTextFieldComponent required label="Teléfono:" name="phone" type="number" />
                  </Grid>
                  <Grid item xs={3} container alignContent="flex-end">
                    <CheckboxesFieldComponent label="Visible" namee="phoneVisible" />
                  </Grid>
                  {values && values.role === 'patient' && (
                    <PatientsBlockFieldComponent role={currentUserProfile.role} />
                  )}
                  <Grid item xs={12}>
                    {values && values.role !== 'admin' && (
                      <HospitalFieldComponent validate={validateHospital} disabled={authRole !== 'admin'} />
                    )}
                  </Grid>
                  <Grid item xs={9}>
                    <CustomTextFieldComponent
                      required
                      name="user"
                      label="Correo"
                      disabled={formType === EDIT_FORM_TEXT}
                    />
                  </Grid>
                  <Grid item xs={3} container alignContent="flex-end">
                    <CheckboxesFieldComponent label="Visible" namee="emailVisible" />
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
