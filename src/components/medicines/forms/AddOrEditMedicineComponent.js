import React from 'react';
import { Form } from 'react-final-form';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { TextField } from 'mui-rff';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import { DialogTitleComponent } from '../../ModalComponent';
import { useMedicinesContext } from '../MedicinesContext';
import { EDIT_FORM_TEXT } from '../../../commons/globalText';
import formValidate from './formValidate';

const useStyles = makeStyles({
  wrapper: {
    position: 'relative',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

function AddOrEditMedicineComponent({ title }) {
  const { formType, selected, setModalVisible, saveMedicineValues } = useMedicinesContext();
  const classes = useStyles();

  const onSubmit = async values => {
    await saveMedicineValues(values, formType);
    setModalVisible(false, true);
  };

  const handleCloseForm = () => {
    setModalVisible(false, true);
  };

  return (
    <>
      <DialogTitleComponent onClose={handleCloseForm}>{title}</DialogTitleComponent>
      <Form
        initialValues={formType === EDIT_FORM_TEXT && selected && selected}
        validate={formValidate}
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} autoComplete="off">
            {formType === EDIT_FORM_TEXT && selected && <input type="hidden" name="id" />}
            <DialogContent dividers>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Nombre del medicamento"
                    name="name"
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Canctidad de Concentracion"
                    name="concentrationCant"
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Tipo de Concentracion"
                    name="concentrationType"
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Dosis"
                    name="dose"
                    typo="number"
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Tipo de dosis"
                    name="doseType"
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Via de administracion"
                    name="administrationRoute"
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Frecuencia"
                    name="frequency"
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Motivo de administracion"
                    name="administrationReason"
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Observaciones"
                    name="observations"
                    variant="outlined"
                    size="small"
                    multiline
                    rows={3}
                    rowsMax={5}
                    InputLabelProps={{
                      shrink: true,
                    }}
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
              <div className={classes.wrapper}>
                <Button
                  disabled={submitting || pristine}
                  disableElevation
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  guardar
                </Button>
                {submitting && <CircularProgress size={24} className={classes.buttonProgress} />}
              </div>
            </DialogActions>
          </form>
        )}
      />
    </>
  );
}

export default AddOrEditMedicineComponent;
