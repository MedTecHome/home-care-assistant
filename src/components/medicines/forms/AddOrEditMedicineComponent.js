import React from 'react';
import { Form } from 'react-final-form';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { DialogTitleComponent } from '../../ModalComponent';
import { useMedicinesContext } from '../MedicinesContext';
import { EDIT_FORM_TEXT } from '../../../commons/globalText';
import formValidate from './formValidate';
import SaveButton from '../../buttons/SaveButton';
import CustomTextFieldComponent from '../../inputs/CustomTextFieldComponent';

function AddOrEditMedicineComponent({ title }) {
  const { formType, selected, setModalVisible, saveMedicineValues } = useMedicinesContext();
  const handleCloseForm = () => {
    setModalVisible(false, null);
  };

  const onSubmit = async values => {
    await saveMedicineValues(values, formType);
    handleCloseForm();
  };

  return (
    <>
      <DialogTitleComponent onClose={handleCloseForm}>{title}</DialogTitleComponent>
      <Form
        initialValues={formType === EDIT_FORM_TEXT && selected && selected}
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
                  <CustomTextFieldComponent required label="Tipo Concentracion" name="concentrationType" />
                </Grid>
                <Grid item xs={4} sm={4}>
                  <CustomTextFieldComponent
                    required
                    label="Cant. Concentracion"
                    name="concentrationCant"
                    labelStyle={{
                      fontSize: 12,
                    }}
                  />
                </Grid>
                <Grid item xs={8}>
                  <CustomTextFieldComponent required label="Tipo dosis" name="doseType" />
                </Grid>
                <Grid item xs={4}>
                  <CustomTextFieldComponent required label="Dosis" name="dose" type="number" />
                </Grid>

                <Grid item xs={8}>
                  <CustomTextFieldComponent required label="Via administracion" name="administrationRoute" />
                </Grid>
                <Grid item xs={4}>
                  <CustomTextFieldComponent required label="Frecuencia" name="frequency" />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextFieldComponent required label="Motivo administracion" name="administrationReason" />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextFieldComponent
                    required
                    label="Observaciones"
                    name="observations"
                    multiline
                    rows={3}
                    rowsMax={5}
                  />
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
