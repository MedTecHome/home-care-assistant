import React, { useMemo } from 'react';
import uuid from 'uuid4';
import { Field, Form } from 'react-final-form';
import createDecorator from 'final-form-calculate';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { EDIT_FORM_TEXT, ADD_FORM_TEXT } from '../../../commons/globalText';
import HospitalFieldComponent from '../../fields/HospitalFieldComponent';
import PatientsBlockFieldComponent from '../../fields/PatientFieldsComponent';

import { DialogTitleComponent } from '../../ModalComponent';
import CustomTextFieldComponent from '../../inputs/CustomTextFieldComponent';
import SaveButton from '../../buttons/SaveButton';
import CheckboxesFieldComponent from '../../fields/CheckboxesFieldComponent';
import listAccess from '../../../commons/access';
import { getPropValue } from '../../../helpers/utils';
import {
  validateProfile,
  validateHospital,
  validateEmail,
  validatePassword,
  agreementValidate
} from './validateProfile';
import RoleFieldComponent from '../../fields/RoleFieldComponent';

function AddOrEditProfilesComponent({
  title,
  currentUserProfile,
  saveProfileValues,
  setModalVisible,
  formType,
  selected,
  isSuperadmin
}) {
  const authRole = getPropValue(currentUserProfile, 'role.id') || null;

  const onSubmit = async (values, form) => {
    await saveProfileValues(values, formType);
    setTimeout(form.reset);
    setModalVisible(false, null);
  };

  const handleCancel = () => {
    setModalVisible(false, null);
  };

  const calculator = useMemo(
    () =>
      createDecorator({
        field: 'ramdomPassword',
        updates: {
          password: ramdomPasswordValue => (ramdomPasswordValue ? uuid() : '')
        }
      }),
    []
  );

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
                ...(selected.role ? { role: selected.role.id } : {}),
                ...(selected.doctor ? { doctor: selected.doctor.id } : {}),
                ...(selected.hospital ? { hospital: selected.hospital.id } : {}),
                ...(selected.birthday ? { birthday: selected.birthday.toDate() } : {}),
                ...(selected.sex ? { sex: selected.sex.id } : {})
              }
            : currentUserProfile && currentUserProfile.role.id === 'doctor' && { doctor: currentUserProfile.id })
        }}
        decorators={[calculator]}
        validate={validateProfile}
        onSubmit={onSubmit}
        render={({ handleSubmit, values, form, submitting, pristine, invalid }) => {
          return (
            <form
              autoComplete="new-password"
              onSubmit={event => {
                if (!invalid) {
                  handleSubmit(event);
                }
              }}
            >
              <DialogContent
                dividers
                style={{
                  maxWidth: 400
                }}
              >
                <Grid container spacing={3}>
                  {isSuperadmin && (
                    <Grid item xs={12}>
                      <RoleFieldComponent disabled={listAccess[authRole].length === 1} userRole={authRole} />
                    </Grid>
                  )}
                  {formType === EDIT_FORM_TEXT && <Field required name="id" type="hidden" component="input" />}
                  <Grid item xs={12} sm={12} md={12}>
                    <CustomTextFieldComponent required label="Nombre:" name="name" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <CustomTextFieldComponent required label="Apellidos:" name="lastName" />
                  </Grid>
                  <Grid item xs={8}>
                    <CustomTextFieldComponent required label="Teléfono principal:" name="primaryPhone" />
                  </Grid>
                  <Grid item xs={4}>
                    <CheckboxesFieldComponent label="Visible" namee="phoneVisible" />
                  </Grid>
                  <Grid item xs={8}>
                    <CustomTextFieldComponent label="Teléfono secundario:" name="secondaryPhone" />
                  </Grid>
                  {values && values.role === 'patient' && <PatientsBlockFieldComponent />}
                  {isSuperadmin && (
                    <Grid item xs={12}>
                      <HospitalFieldComponent validate={validateHospital} />
                    </Grid>
                  )}
                  <Grid item xs={8}>
                    <CustomTextFieldComponent
                      required
                      name="email"
                      label="Correo"
                      validate={value => {
                        return form.getState().initialValues.email !== value ? validateEmail(value) : null;
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <CheckboxesFieldComponent label="Visible" namee="emailVisible" />
                  </Grid>
                  <Grid item xs={8}>
                    <CustomTextFieldComponent
                      required
                      name="username"
                      label="Usuario"
                      disabled={formType === EDIT_FORM_TEXT}
                    />
                  </Grid>
                  {formType === ADD_FORM_TEXT && (
                    <>
                      <Grid item xs={8}>
                        <CustomTextFieldComponent
                          disabled={values.ramdomPassword}
                          type="password"
                          required
                          name="password"
                          label="Contraseña"
                          validate={validatePassword}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <CheckboxesFieldComponent label="Ramdom" namee="ramdomPassword" />
                      </Grid>
                    </>
                  )}
                  {values.role === 'patient' && (
                    <Grid item xs={12}>
                      <CheckboxesFieldComponent
                        required
                        labelStyle={{
                          fontSize: '0.766rem',
                          textAlign: 'justify'
                        }}
                        namee="agreement"
                        label="Conocimiento de acuerdo: al chequear esta casilla el paciente tiene conocimiento que el sistema '?' no es un sistema de respuesta de emergencia"
                        validate={agreementValidate}
                      />
                    </Grid>
                  )}
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button disableElevation variant="contained" onClick={handleCancel}>
                  cancelar
                </Button>
                <SaveButton pristine={pristine} submitting={submitting} invalid={invalid} />
              </DialogActions>
            </form>
          );
        }}
      />
    </>
  );
}

export default AddOrEditProfilesComponent;
