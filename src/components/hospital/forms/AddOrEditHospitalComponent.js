import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Form } from 'react-final-form';
import { TextField } from 'mui-rff';
import { green } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ADD_FORM_TEXT, EDIT_FORM_TEXT } from '../../../commons/globalText';
import { useHospitalContext } from '../HospitalContext';

const useStyles = makeStyles({
  formControl: {
    width: '100%',
  },
  buttonActions: {
    display: 'flex',
    justifyContent: 'space-around',
  },
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
    <div>
      <h3>{formType === ADD_FORM_TEXT ? 'Adicionar' : 'Editar'} hospital</h3>
      <Form
        initialValues={formType === EDIT_FORM_TEXT && hospitalSelected && hospitalSelected}
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form
            autoComplete="off"
            onSubmit={event => {
              handleSubmit(event).then(() => {
                form.reset();
              });
            }}
          >
            {hospitalSelected && formType === EDIT_FORM_TEXT && <input type="hidden" name="id" />}
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Nombre hospital"
                  required
                  className={classes.formControl}
                  variant="outlined"
                  size="small"
                  name="name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Direccion del hospital"
                  required
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
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.formControl}
                  variant="outlined"
                  size="small"
                  name="phone"
                />
              </Grid>
              <Grid item container spacing={5}>
                <Grid item xs={12} sm={6} lg={4}>
                  <TextField
                    type="number"
                    label="Limite de doctores"
                    required
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
                    required
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
              <Grid item className={classes.buttonActions} xs={12}>
                <Button disableElevation variant="contained" onClick={handleCancel}>
                  cancelar
                </Button>
                <div className={classes.wrapper}>
                  <Button
                    disabled={submitting || pristine}
                    disableElevation
                    variant="contained"
                    type="submit"
                    color="primary"
                  >
                    guardar
                  </Button>
                  {submitting && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
              </Grid>
            </Grid>
          </form>
        )}
      />
    </div>
  );
}
