import React, { useState } from 'react';
import moment from 'moment';
import { Field, Form } from 'react-final-form';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { useMediaQuery } from '@material-ui/core';
import { DialogTitleComponent } from '../../ModalComponent';
import { useTreatmentsContext } from '../TreatmentsContext';
import DateFieldComponent from '../../fields/DateFieldComponent';
import SaveButton from '../../buttons/SaveButton';
import ProfileFieldComponent from '../../fields/ProfileFieldComponent';
import MedicinesFieldComponent from '../../fields/medicines/MedicinesFieldComponent';
import { validateDoctor } from '../../Profiles/forms/validateProfile';
import { ADD_FORM_TEXT, CANCEL_FORM_TEXT, EDIT_FORM_TEXT } from '../../../commons/globalText';
import useCustomStyles from '../../../jss/globalStyles';
import CustomTextFieldComponent from '../../inputs/CustomTextFieldComponent';
import validateForm from './validateForm';
import { getPropValue } from '../../../helpers/utils';
import ConcentrationFieldComponent from '../../fields/ConcentrationFielComponent';
import DosisFieldComponent from '../../fields/DosisFielComponent';
import AdministrationRouteFielComponent from '../../fields/AdministrationRouteFielComponent';

function AddOrEditMedicineForm({ selected, onSubmit }) {
  return (
    <div
      style={{
        backgroundColor: '#f5f5f6',
        padding: 16,
        borderRadius: 4
      }}
    >
      <Form
        initialValues={
          selected && {
            ...selected,
            concentrationType: getPropValue(selected, 'concentrationType.id') || '',
            doseType: getPropValue(selected, 'doseType.id') || '',
            administrationType: getPropValue(selected, 'administrationType.id') || ''
          }
        }
        onSubmit={onSubmit}
        render={({ handleSubmit, submitting, pristine, invalid }) => (
          <form noValidate onSubmit={event => !invalid && handleSubmit(event)} autoComplete="off">
            <input type="hidden" name="id" />
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <CustomTextFieldComponent required label="Nombre medicamento" name="name" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ConcentrationFieldComponent label="Tipo Concentración" name="concentrationType" />
              </Grid>
              <Grid item xs={6}>
                <CustomTextFieldComponent
                  type="number"
                  label="Cant. Concentración"
                  name="concentrationCant"
                  labelStyle={{
                    fontSize: 12
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DosisFieldComponent label="Tipo dosis" name="doseType" />
              </Grid>
              <Grid item xs={6}>
                <CustomTextFieldComponent label="Cant. Dosis" name="doseCant" type="number" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <AdministrationRouteFielComponent label="Via Administración" name="administrationType" />
              </Grid>
              <Grid item xs={6}>
                <CustomTextFieldComponent label="Frecuencia" name="frequency" type="number" />
              </Grid>
              <Grid item xs={12}>
                <CustomTextFieldComponent label="Motivo Administración" name="administrationReason" />
              </Grid>
              <Grid item xs={12}>
                <CustomTextFieldComponent label="Observaciones" name="observations" multiline rows={3} rowsMax={5} />
              </Grid>
            </Grid>
            <DialogActions>
              <SaveButton submitting={submitting} invalid={invalid} pristine={pristine} />
            </DialogActions>
          </form>
        )}
      />
    </div>
  );
}

function AddOrEditFormComponent({ title }) {
  const { setModalVisible, selected, saveValues, formType, params } = useTreatmentsContext();
  const [medicineSelected, setSelectedMedicine] = useState(null);
  const [medicineEdited, setMedicineEdited] = useState(null);
  const classes = useCustomStyles();
  const match = useMediaQuery(theme => theme.breakpoints.down('xs'));

  const handleCloseModal = () => {
    setModalVisible(false, CANCEL_FORM_TEXT);
  };

  const onSubmit = async values => {
    await saveValues(values, formType);
    setModalVisible(false, null);
  };

  return (
    <div
      style={{
        maxWidth: medicineSelected && !match ? 780 : 400
      }}
    >
      <DialogTitleComponent onClose={handleCloseModal}>{title}</DialogTitleComponent>
      <DialogContent dividers>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={medicineSelected ? 6 : 12}>
            <Form
              validate={validateForm}
              mutators={{
                setMedicine: (args, state, utils) => {
                  utils.changeValue(state, 'medicines', () =>
                    args[0].length > 0 ? JSON.stringify({ medicines: args[0] }) : undefined
                  );
                }
              }}
              initialValues={{
                ...(formType === EDIT_FORM_TEXT &&
                  selected && {
                    ...selected,
                    user: selected.user.id,
                    startDate: moment.unix(selected.startDate),
                    endDate: moment.unix(selected.endDate)
                  }),
                ...(formType === ADD_FORM_TEXT && params && params['user.id'] && { user: params['user.id'] })
              }}
              onSubmit={onSubmit}
              render={({ handleSubmit, form, submitting, pristine, invalid, values, errors }) => (
                <form
                  noValidate
                  autoComplete="off"
                  onSubmit={event => {
                    if (!invalid)
                      handleSubmit(event).then(() => {
                        form.reset();
                      });
                  }}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <CustomTextFieldComponent required variant="outlined" label="Tipo de tratamiento" name="name" />
                    </Grid>
                    <Grid item xs={12}>
                      <ProfileFieldComponent
                        required
                        disabled={!!form.getState().initialValues.user}
                        label="Paciente"
                        name="user"
                        filterRole="patient"
                        userRole="doctor"
                        classes={classes}
                        validate={validateDoctor}
                      />
                    </Grid>
                    <DateFieldComponent label="Fecha inicio" name="startDate" classes={classes} />
                    <DateFieldComponent label="Fecha fin" name="endDate" classes={classes} minDate={values.startDate} />
                    <Grid item xs={12}>
                      <Field
                        name="medicines"
                        render={({ input }) => (
                          <input
                            type="hidden"
                            name={input.name}
                            onChange={input.onChange}
                            onBlur={input.onBlur}
                            onFocus={input.onFocus}
                            value={input.value}
                          />
                        )}
                      />
                      <MedicinesFieldComponent
                        required
                        name="medicines"
                        label="Medicamentos"
                        errors={errors.medicines}
                        setMedicine={form.mutators.setMedicine}
                        defaultValue={(formType === EDIT_FORM_TEXT && getPropValue(selected, 'medicines')) || []}
                        medicineSelected={medicineSelected}
                        medicineEdited={medicineEdited}
                        setMedicineEdited={setMedicineEdited}
                        setSelectedMedicine={setSelectedMedicine}
                      />
                    </Grid>
                  </Grid>
                  <DialogActions>
                    <Button disableElevation variant="contained" onClick={handleCloseModal} size="small">
                      cancelar
                    </Button>
                    <SaveButton submitting={submitting} pristine={pristine} invalid={invalid} />
                  </DialogActions>
                </form>
              )}
            />
          </Grid>
          {!match && (
            <Grid item xs={12} sm={6}>
              {medicineSelected && <AddOrEditMedicineForm selected={medicineSelected} onSubmit={setMedicineEdited} />}
            </Grid>
          )}
        </Grid>
      </DialogContent>
    </div>
  );
}
export default AddOrEditFormComponent;
