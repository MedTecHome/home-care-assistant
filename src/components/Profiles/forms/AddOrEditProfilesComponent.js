import React, { useMemo } from 'react';
import uuid from 'uuid4';
import { Field, Form } from 'react-final-form';
import createDecorator from 'final-form-calculate';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { makeStyles } from '@material-ui/core';
import { EDIT_FORM_TEXT, ADD_FORM_TEXT, NAME_APP, SUCCESS_MESSAGE, ERROR_MESSAGE } from '../../../commons/globalText';
import PatientsBlockFieldComponent from '../../fields/PatientFieldsComponent';
import { DialogTitleComponent } from '../../ModalComponent';
import CustomTextFieldComponent from '../../inputs/CustomTextFieldComponent';
import SaveButton from '../../buttons/SaveButton';
import CheckboxesFieldComponent from '../../fields/CheckboxesFieldComponent';
import { getPropValue } from '../../../helpers/utils';
import {
  validateProfile,
  validateEmail,
  validatePassword,
  agreementValidate,
  validateLastname,
  validateUsername
} from './validateProfile';
import ClinicBlockFieldComponent from '../../fields/ClinicBlockFieldComponent';
import useCustomStyles from '../../../jss/globalStyles';
import { useMessageContext } from '../../../MessageHandle/MessageContext';

const useStyles = makeStyles({
  labelStyle: {
    fontSize: '0.766rem',
    textAlign: 'justify'
  }
});

function AddOrEditProfilesComponent({
  title,
  filterRole,
  currentUserProfile,
  saveProfileValues,
  setModalVisible,
  formType,
  selected
}) {
  const { RegisterMessage } = useMessageContext();
  const classes = useCustomStyles();
  const localClasses = useStyles();

  const onSubmit = async (values, form) => {
    try {
      await saveProfileValues(values, formType);
      setTimeout(form.reset);
      setModalVisible(false, null);
      RegisterMessage(SUCCESS_MESSAGE, 'Success', `Profile - form - ${formType}`);
    } catch (e) {
      RegisterMessage(ERROR_MESSAGE, e, `Profile - form - ${formType}`);
    }
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
          role: filterRole,
          ...(formType === EDIT_FORM_TEXT && selected
            ? {
                ...selected,
                ...(selected.role ? { role: getPropValue(selected, 'role') } : {}),
                parent: getPropValue(selected, 'parent'),
                ...(selected.sex ? { sex: getPropValue(selected, 'sex') } : {}),
                ...(selected.birthday ? { birthday: selected.birthday } : {})
              }
            : {}),
          parent: currentUserProfile.id
        }}
        decorators={[calculator]}
        validate={validateProfile}
        onSubmit={onSubmit}
        render={({ handleSubmit, values, form, submitting, pristine, invalid, errors }) => {
          return (
            <form
              autoComplete="new-password"
              onSubmit={event => {
                if (!invalid) {
                  handleSubmit(event);
                }
              }}
            >
              <DialogContent dividers className={classes.contentDialog}>
                <Grid container spacing={3}>
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
                        validate={validateLastname}
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
                    <CheckboxesFieldComponent disabled={!values.primaryPhone} label="Visible" namee="phoneVisible" />
                  </Grid>
                  <Grid item xs={8}>
                    <CustomTextFieldComponent label="Teléfono secundario:" name="secondaryPhone" />
                  </Grid>
                  <Grid item xs={4}>
                    <CheckboxesFieldComponent
                      disabled={!values.secondaryPhone}
                      label="Visible"
                      namee="phoneSecondaryVisible"
                    />
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
                        if (form.getState().initialValues.email !== value) {
                          if (values.email !== value) {
                            return validateEmail(value);
                          }
                          return errors.email;
                        }
                        return null;
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
                      disabled={formType === EDIT_FORM_TEXT && values.role !== 'clinic'}
                      validate={value => {
                        if (form.getState().initialValues.username !== value) {
                          if (values.username !== value) {
                            return validateUsername(value);
                          }
                          return errors.username;
                        }
                        return null;
                      }}
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
                        labelStyle={localClasses.labelStyle}
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
