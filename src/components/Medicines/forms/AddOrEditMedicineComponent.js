import React from 'react';
import { Form } from 'react-final-form';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { DialogTitleComponent } from '../../ModalComponent';
import { EDIT_FORM_TEXT } from '../../../commons/globalText';
import formValidate from './formValidate';
import SaveButton from '../../buttons/SaveButton';
import CustomTextFieldComponent from '../../inputs/CustomTextFieldComponent';
import ConcentrationFieldComponent from '../../fields/ConcentrationFielComponent';
import DosisFieldComponent from '../../fields/DosisFielComponent';
import AdministrationRouteFielComponent from '../../fields/AdministrationRouteFielComponent';
import { getPropValue } from '../../../helpers/utils';
import useCustomStyles from '../../../jss/globalStyles';

export function AddOrEditMedicineFormComponent({ formType, selected, onSubmit, handleCloseForm, currentUserProfile }) {
  const classes = useCustomStyles();
  return (
    <Form
      initialValues={
        formType === EDIT_FORM_TEXT && selected ? selected : { clinic: getPropValue(currentUserProfile, 'parent') }
      }
      validate={formValidate}
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine, invalid }) => (
        <form noValidate onSubmit={event => !invalid && handleSubmit(event)} autoComplete="off">
          {formType === EDIT_FORM_TEXT && selected && <input type="hidden" name="id" />}
          <DialogContent className={classes.contentDialog} style={{ padding: 15 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <CustomTextFieldComponent
                  disabled={formType === EDIT_FORM_TEXT}
                  required
                  label="Nombre medicamento"
                  name="name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ConcentrationFieldComponent label="Tipo Concentración" name="concentrationType" />
              </Grid>
              <Grid item xs={6}>
                <CustomTextFieldComponent
                  type="number"
                  label="Concentración"
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
                <CustomTextFieldComponent label="Frecuencia" name="frequency" />
              </Grid>
              <Grid item xs={12}>
                <CustomTextFieldComponent label="Motivo Administración" name="administrationReason" />
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
  );
}

function AddOrEditMedicineComponent({ title, formType, selected, setModalVisible, saveMedicineValues, clinic }) {
  const handleCloseForm = () => {
    setModalVisible(false, null);
  };

  const onSubmit = async values => {
    await saveMedicineValues({ ...values, clinic }, formType);
    setModalVisible(false, null);
  };

  return (
    <>
      <DialogTitleComponent onClose={handleCloseForm}>{title}</DialogTitleComponent>
      <AddOrEditMedicineFormComponent
        formType={formType}
        selected={selected}
        onSubmit={onSubmit}
        handleCloseForm={handleCloseForm}
      />
    </>
  );
}

export default AddOrEditMedicineComponent;
