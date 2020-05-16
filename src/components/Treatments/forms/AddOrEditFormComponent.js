import React from 'react';
import { Field, Form } from 'react-final-form';
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
import { validateDoctor } from '../../Profiles/forms/validateProfile';
import { ADD_FORM_TEXT, CANCEL_FORM_TEXT, EDIT_FORM_TEXT } from '../../../commons/globalText';
import useCustomStyles from '../../../jss/globalStyles';
import CustomTextFieldComponent from '../../inputs/CustomTextFieldComponent';
import validateForm from './validateForm';
import { getPropValue } from '../../../helpers/utils';

function AddOrEditFormComponent({ title }) {
  const { setModalVisible, selected, saveValues, formType, filters } = useTreatmentsContext();
  const classes = useCustomStyles();

  const handleCloseModal = () => {
    setModalVisible(false, CANCEL_FORM_TEXT);
  };

  const onSubmit = async values => {
    await saveValues(values, formType);
    setModalVisible(false, null);
  };

  return (
    <>
      <DialogTitleComponent onClose={handleCloseModal}>{title}</DialogTitleComponent>
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
              patient: selected.patient.id,
              startDate: selected.startDate.toDate(),
              endDate: selected.endDate.toDate()
            }),
          ...(formType === ADD_FORM_TEXT && filters && filters['patient.id'] && { patient: filters['patient.id'] })
        }}
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, invalid, values, errors }) => {
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
                    <CustomTextFieldComponent required variant="outlined" label="Nombre" name="name" />
                  </Grid>
                  <Grid item xs={12}>
                    <ProfileFieldComponent
                      required
                      label="Paciente"
                      name="patient"
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
                      render={({ input }) => {
                        return (
                          <input
                            type="hidden"
                            name={input.name}
                            onChange={input.onChange}
                            onBlur={input.onBlur}
                            onFocus={input.onFocus}
                            value={input.value}
                          />
                        );
                      }}
                    />
                    <MedicinesFieldComponent
                      required
                      name="medicines"
                      label="Medicamentos"
                      errors={errors.medicines}
                      setMedicine={form.mutators.setMedicine}
                      defaultValue={getPropValue(selected, 'medicines') || []}
                    />
                  </Grid>
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
