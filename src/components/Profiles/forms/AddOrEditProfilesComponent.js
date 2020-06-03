import React, { useMemo } from 'react';
import uuid from 'uuid4';
import { Field, Form } from 'react-final-form';
import createDecorator from 'final-form-calculate';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { EDIT_FORM_TEXT, ADD_FORM_TEXT, NAME_APP } from '../../../commons/globalText';
import PatientsBlockFieldComponent from '../../fields/PatientFieldsComponent';

import { DialogTitleComponent } from '../../ModalComponent';
import CustomTextFieldComponent from '../../inputs/CustomTextFieldComponent';
import SaveButton from '../../buttons/SaveButton';
import CheckboxesFieldComponent from '../../fields/CheckboxesFieldComponent';
import listAccess from '../../../commons/access';
import { getPropValue } from '../../../helpers/utils';
import { validateProfile, validateEmail, validatePassword, agreementValidate } from './validateProfile';
import RoleFieldComponent from '../../fields/RoleFieldComponent';
import ClinicBlockFieldComponent from '../../fields/ClinicBlockFieldComponent';

function AddOrEditProfilesComponent({
  title,
  currentUserProfile,
  saveProfileValues,
  setModalVisible,
  formType,
  selected,
  isSuperadmin
}) {
  const authRole = getPropValue(currentUserProfile, 'role') || null;

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
        mutators={{
          setLogoUrl: (args, state, utils) => {
            utils.changeValue(state, 'logoUrl', () => (args[0].length > 0 ? args[0] : ''));
          }
        }}
        initialValues={{
          phoneVisible: false,
          emailVisible: false,
          role: listAccess[authRole][0],
          ...(formType === EDIT_FORM_TEXT && selected
            ? {
                ...selected,
                ...(selected.role ? { role: getPropValue(selected, 'role') } : {}),
                parent: getPropValue(selected, 'parent'),
                ...(selected.sex ? { sex: getPropValue(selected, 'sex') } : {}),
                ...(selected.birthday ? { birthday: selected.birthday.toDate() } : {})
              }
            : {}),
          parent: currentUserProfile.id
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
                    <CustomTextFieldComponent
                      required
                      label="Nombre:"
                      name="name"
                      disabled={formType === EDIT_FORM_TEXT}
                    />
                  </Grid>
                  {getPropValue(values, 'role') !== 'clinic' ? (
                    <Grid item xs={12} sm={12} md={12}>
                      <CustomTextFieldComponent
                        required
                        label="Apellidos:"
                        name="lastName"
                        disabled={formType === EDIT_FORM_TEXT}
                      />
                    </Grid>
                  ) : (
                    <ClinicBlockFieldComponent
                      defaultLogo={getPropValue(selected, 'logoUrl')}
                      setLogoUrl={form.mutators.setLogoUrl}
                    />
                  )}
                  {getPropValue(values, 'role') === 'patient' ? (
                    <PatientsBlockFieldComponent formType={formType} />
                  ) : null}
                  <Grid item xs={8}>
                    <CustomTextFieldComponent required label="Teléfono principal:" name="primaryPhone" />
                  </Grid>
                  <Grid item xs={4}>
                    <CheckboxesFieldComponent label="Visible" namee="phoneVisible" />
                  </Grid>
                  <Grid item xs={8}>
                    <CustomTextFieldComponent label="Teléfono secundario:" name="secondaryPhone" />
                  </Grid>
                  {['patient', 'clinic'].includes(getPropValue(values, 'role')) ? (
                    <Grid item xs={12} sm={8}>
                      <CustomTextFieldComponent name="address" label="Dirección" />
                    </Grid>
                  ) : null}
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
                        disabled={formType === EDIT_FORM_TEXT}
                        labelStyle={{
                          fontSize: '0.766rem',
                          textAlign: 'justify'
                        }}
                        namee="agreement"
                        label={`Conocimiento de acuerdo: al chequear esta casilla el paciente tiene conocimiento que el sistema ${NAME_APP} no es un sistema de respuesta de emergencia`}
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
