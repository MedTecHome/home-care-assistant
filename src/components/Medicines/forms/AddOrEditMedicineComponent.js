import React from 'react';
import { Form } from 'react-final-form';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { DialogTitleComponent } from '../../ModalComponent';
import { useMedicinesContext } from '../MedicinesContext';
import { CANCEL_FORM_TEXT, EDIT_FORM_TEXT } from '../../../commons/globalText';
import formValidate from './formValidate';
import SaveButton from '../../buttons/SaveButton';
import CustomTextFieldComponent from '../../inputs/CustomTextFieldComponent';
import ConcentrationFieldComponent from '../../fields/ConcentrationFielComponent';
import DosisFieldComponent from '../../fields/DosisFielComponent';
import AdministrationRouteFielComponent from '../../fields/AdministrationRouteFielComponent';
import { getPropValue } from '../../../helpers/utils';

function AddOrEditMedicineComponent({ title }) {
  const { formType, selected, setModalVisible, saveMedicineValues } = useMedicinesContext();
  const handleCloseForm = () => {
    setModalVisible(false, CANCEL_FORM_TEXT);
  };

  const onSubmit = async values => {
    await saveMedicineValues(values, formType);
    setModalVisible(false, null);
  };

  return (
    <>
      <DialogTitleComponent onClose={handleCloseForm}>{title}</DialogTitleComponent>
      <Form
        initialValues={
          formType === EDIT_FORM_TEXT &&
          selected && {
            ...selected,
            concentrationType: getPropValue(selected, 'concentrationType.id') || '',
            doseType: getPropValue(selected, 'doseType.id') || '',
            administrationType: getPropValue(selected, 'administrationType.id') || ''
          }
        }
        validate={formValidate}
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, invalid }) => (
          <form
            noValidate
            onSubmit={event =>
              !invalid &&
              handleSubmit(event).then(() => {
                form.reset();
              })
            }
            autoComplete="off"
          >
            {formType === EDIT_FORM_TEXT && selected && <input type="hidden" name="id" />}
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <CustomTextFieldComponent required label="Nombre medicamento" name="name" />
                </Grid>
                <Grid item xs={8} sm={8}>
                  <ConcentrationFieldComponent required label="Tipo Concentración" name="concentrationType" />
                </Grid>
                <Grid item xs={4} sm={4}>
                  <CustomTextFieldComponent
                    required
                    type="number"
                    label="Cant. Concentración"
                    name="concentrationCant"
                    labelStyle={{
                      fontSize: 12
                    }}
                  />
                </Grid>
                <Grid item xs={8}>
                  <DosisFieldComponent required label="Tipo dosis" name="doseType" />
                </Grid>
                <Grid item xs={4}>
                  <CustomTextFieldComponent required label="Cant. Dosis" name="doseCant" type="number" />
                </Grid>
                <Grid item xs={8}>
                  <AdministrationRouteFielComponent required label="Via Administración" name="administrationType" />
                </Grid>
                <Grid item xs={4}>
                  <CustomTextFieldComponent required label="Frecuencia" name="frequency" type="number" />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextFieldComponent required label="Motivo Administración" name="administrationReason" />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextFieldComponent label="Observaciones" name="observations" multiline rows={3} rowsMax={5} />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                disableElevation
                onClick={() => {
                  handleCloseForm();
                  form.reset();
                }}
              >
                cancel
              </Button>
              <SaveButton submitting={submitting} invalid={invalid} pristine={pristine} />
            </DialogActions>
          </form>
        )}
      />
    </>
  );
}

export default AddOrEditMedicineComponent;
