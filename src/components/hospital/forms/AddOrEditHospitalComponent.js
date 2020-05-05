import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Form } from 'react-final-form';
import { TextField } from 'mui-rff';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { ADD_FORM_TEXT, EDIT_FORM_TEXT } from '../../../commons/globalText';
import { useHospitalContext } from '../HospitalContext';
import { DialogTitleComponent } from '../../ModalComponent';
import validateHospital from './validateHospital';
import SaveButton from '../../buttons/SaveButton';

const useStyles = makeStyles({
  formControl: {
    width: '100%',
  },
  buttonActions: {
    display: 'flex',
    justifyContent: 'space-around',
  },
});

export default function AddOrEditHospitalComponent() {
  const { formType, hospitalSelected, saveHospitalValues, setModalVisible } = useHospitalContext();
  const classes = useStyles();

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
        initialValues={formType === EDIT_FORM_TEXT && hospitalSelected && hospitalSelected}
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
              {hospitalSelected && formType === EDIT_FORM_TEXT && <input type="hidden" name="id" />}
              <Grid container item spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Nombre hospital"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    className={classes.formControl}
                    variant="outlined"
                    size="small"
                    name="name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Direccion del hospital"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    className={classes.formControl}
                    variant="outlined"
                    size="small"
                    name="address"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="number"
                    label="Telefono"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    className={classes.formControl}
                    variant="outlined"
                    size="small"
                    name="phone"
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <TextField
                    type="number"
                    label="Limite de doctores"
                    inputProps={{
                      min: 0,
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    className={classes.formControl}
                    variant="outlined"
                    size="small"
                    name="maxDoctors"
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <TextField
                    type="number"
                    label="Limite de pacientes"
                    inputProps={{
                      min: 0,
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    className={classes.formControl}
                    variant="outlined"
                    size="small"
                    name="maxPatients"
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button disableElevation variant="contained" onClick={handleCancel}>
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
