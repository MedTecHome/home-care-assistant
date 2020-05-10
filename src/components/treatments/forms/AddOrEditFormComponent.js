import React from 'react';
import { Form } from 'react-final-form';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { DialogTitleComponent } from '../../ModalComponent';
import { useTreatmentsContext } from '../TreatmentsContext';
import DateFieldComponent from '../../fields/DateFieldComponent';
import SaveButton from '../../buttons/SaveButton';
import ProfileFieldComponent from '../../fields/ProfileFieldComponent';
import MedicinesFieldComponent from '../../fields/MedicinesFieldComponent';
import { validateDoctor } from '../../profiles/forms/valdiateProfile';
import { ADD_FORM_TEXT, EDIT_FORM_TEXT } from '../../../commons/globalText';
import useCustomStyles from '../../../jss/globalStyles';

function AddOrEditFormComponent({ title }) {
  const { setModalVisible, selected, saveValues, formType, filters } = useTreatmentsContext();
  const classes = useCustomStyles();
  const handleCloseModal = () => {
    setModalVisible(false, null);
  };

  const onSubmit = async values => {
    await saveValues(values, formType);
    handleCloseModal();
  };

  return (
    <>
      <DialogTitleComponent onClose={handleCloseModal}>{title}</DialogTitleComponent>
      <Form
        initialValues={
          formType === EDIT_FORM_TEXT && selected
            ? {
                ...selected,
                medicine: selected.medicine.id,
                patient: selected.patient.id,
                startDate: selected.startDate.toDate(),
                endDate: selected.endDate.toDate()
              }
            : formType === ADD_FORM_TEXT && filters && filters['patient.id'] && { patient: filters['patient.id'] }
        }
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, invalid, values }) => {
          return (
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
              <DialogContent dividers>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <ProfileFieldComponent
                      label="Paciente"
                      name="patient"
                      filterRole="patient"
                      userRole="doctor"
                      classes={classes}
                      validate={validateDoctor}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MedicinesFieldComponent classes={classes} />
                  </Grid>
                  <DateFieldComponent label="fecha inicio" name="startDate" classes={classes} />
                  <DateFieldComponent label="fecha fin" name="endDate" classes={classes} minDate={values.startDate} />
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button disableElevation variant="contained" onClick={handleCloseModal} size="small">
                  cancelar
                </Button>
                <SaveButton submitting={submitting} pristine={pristine} invalid={invalid} />
              </DialogActions>
            </form>
          );
        }}
      />
    </>
  );
}
export default AddOrEditFormComponent;