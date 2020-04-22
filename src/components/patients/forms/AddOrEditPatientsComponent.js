import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { KeyboardDatePicker, TextField } from 'mui-rff';
import MomentUtils from '@date-io/moment';
import { Form } from 'react-final-form';
import moment from 'moment';
import DoctorAndPatientFields from './DoctorAndPatientFields';
import { usePatientsContext } from '../../../contexts/PatientsContext';
import { EDIT_FORM_TEXT } from '../../../commons/globalText';
import PatientsFormValidate from './PatientsFormValidate';

const useStyles = makeStyles(() => ({
  formControl: {
    width: '100%',
  },
  titleForm: {
    color: '#cdcdcd',
  },
}));

function AddOrEditPatientsComponent({ title }) {
  const { savePatientsData, setModalVisible, patientSelected, formType } = usePatientsContext();
  const classes = useStyles();

  const onSubmit = values => {
    savePatientsData({ ...values, birthday: moment(values.birthday).toDate() }, formType);
    setModalVisible(false, null);
  };

  const onCancel = () => {
    setModalVisible(false, null);
  };

  const { birthday, ...initialValues } = patientSelected || {};

  return (
    <div>
      <Form
        initialValues={
          formType === EDIT_FORM_TEXT && patientSelected ? { ...initialValues, birthday: birthday.toDate() } : {}
        }
        validate={PatientsFormValidate}
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form autoComplete="off" onSubmit={handleSubmit}>
            <Container maxWidth="xs">
              <div className={classes.titleForm}>
                <h4>{title} Paciente</h4>
              </div>
              <Grid container justify="space-around" spacing={3}>
                <DoctorAndPatientFields classes={classes} formType={formType} />
                <Grid item xs={8} sm={8} md={8}>
                  <KeyboardDatePicker
                    required
                    dateFunsUtils={MomentUtils}
                    className={classes.formControl}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    variant="inline"
                    label="Fecha de nacimiento"
                    autoOk
                    placeholder="DD/MM/YYYY"
                    format="DD/MM/YYYY"
                    inputVariant="outlined"
                    name="birthday"
                    InputAdornmentProps={{ position: 'start' }}
                  />
                </Grid>
                <Grid item xs={4} sm={4} md={4}>
                  <TextField
                    required
                    type="number"
                    className={classes.formControl}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    label="Estatura:"
                    variant="outlined"
                    name="height"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    className={classes.formControl}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    label="Direccion:"
                    variant="outlined"
                    name="address"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    className={classes.formControl}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    label="Usuario:"
                    variant="outlined"
                    name="userId"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    className={classes.formControl}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    label="Doctor:"
                    variant="outlined"
                    name="doctorId"
                  />
                </Grid>
                <Grid item container xs={12} justify="space-evenly">
                  <Button variant="contained" onClick={onCancel}>
                    cancelar
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    Aceptar
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </form>
        )}
      />
    </div>
  );
}

export default AddOrEditPatientsComponent;
