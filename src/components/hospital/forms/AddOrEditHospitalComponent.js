import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Form } from 'react-final-form';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { ADD_FORM_TEXT, EDIT_FORM_TEXT } from '../../../commons/globalText';
import { useHospitalContext } from '../HospitalContext';
import { DialogTitleComponent } from '../../ModalComponent';
import validateHospital from './validateHospital';
import SaveButton from '../../buttons/SaveButton';
import CustomTextFieldComponent from '../../inputs/CustomTextFieldComponent';

export default function AddOrEditHospitalComponent() {
  const { formType, selected, saveHospitalValues, setModalVisible } = useHospitalContext();
  const handleCancel = () => {
    setModalVisible(false, null);
  };

  const onSubmit = async values => {
    await saveHospitalValues(values, formType);
    handleCancel();
  };

  return (
    <>
      <DialogTitleComponent onClose={handleCancel}>
        {formType === ADD_FORM_TEXT ? 'Adicionar' : 'Editar'} hospital
      </DialogTitleComponent>
      <Form
        initialValues={formType === EDIT_FORM_TEXT && selected && selected}
        validate={validateHospital}
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, invalid }) => (
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
              {selected && formType === EDIT_FORM_TEXT && <input type="hidden" name="id" />}
              <Grid container item spacing={3}>
                <Grid item xs={12}>
                  <CustomTextFieldComponent required label="Nombre hospital" name="name" />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextFieldComponent label="Direccion del hospital" name="address" />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextFieldComponent type="number" label="Telefono" name="phone" />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <CustomTextFieldComponent
                    type="number"
                    label="Limite de doctores"
                    name="maxDoctors"
                    textAlign="right"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <CustomTextFieldComponent
                    type="number"
                    label="Limite de pacientes"
                    name="maxPatients"
                    textAlign="right"
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button disableElevation variant="contained" onClick={handleCancel} size="small">
                cancelar
              </Button>
              <SaveButton submitting={submitting} pristine={pristine} invalid={invalid} />
            </DialogActions>
          </form>
        )}
      />
    </>
  );
}
