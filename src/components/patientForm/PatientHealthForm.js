import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { Form } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
import { isEmpty, isNil } from 'ramda';
import PresionForm from './PresionForm';
import TemperaturaForm from './TemperaturaForm';
import GlucosaForm from './GlucosaForm';
import PesoForm from './PesoForm';
import RespiracionForm from './RespiracionForm';
import OxygenoForm from './OxygenoForm';
import CoagulacionForm from './CoagulacionForm';
import SelectedChecboxForm from './SelectedCheckboxForm';
import PulsoForm from './PulsoForm';
import { saveHealthDataAction } from './reducers/PatienHealthActions';

const useStyles = makeStyles(theme => ({
  formContainer: {
    maxWidth: 340,
  },
  formControl: {
    width: '100%',
  },
  titleForms: {
    color: theme.palette.grey['600'],
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 10,
  },
}));

const PatientHEalthForm = ({ location }) => {
  const urlSearchParams = new URLSearchParams(location.search);
  const selectedCheckbox = urlSearchParams.getAll('formulario');
  const classes = useStyles();

  const onSubmit = values => {
    if (!isNil(values) && !isEmpty(values)) {
      saveHealthDataAction(values);
    }
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
          <SelectedChecboxForm defaultValues={selectedCheckbox} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
              <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  {selectedCheckbox.includes('pressure') && (
                    <Grid item xs={12}>
                      <PresionForm classStyle={classes} />
                    </Grid>
                  )}
                  {selectedCheckbox.includes('temperature') && (
                    <Grid item xs={12}>
                      <TemperaturaForm classStyle={classes} />
                    </Grid>
                  )}
                  {selectedCheckbox.includes('glucose') && (
                    <Grid item xs={12}>
                      <GlucosaForm classStyle={classes} />
                    </Grid>
                  )}
                  {selectedCheckbox.includes('weight') && (
                    <Grid item xs={12}>
                      <PesoForm classStyle={classes} />
                    </Grid>
                  )}
                  {selectedCheckbox.includes('breathing') && (
                    <Grid item xs={12}>
                      <RespiracionForm classStyle={classes} />
                    </Grid>
                  )}
                  {selectedCheckbox.includes('oxygeno') && (
                    <Grid item xs={12}>
                      <OxygenoForm classStyle={classes} />
                    </Grid>
                  )}
                  {selectedCheckbox.includes('inr') && (
                    <Grid item xs={12}>
                      <CoagulacionForm classStyle={classes} />
                    </Grid>
                  )}
                  {selectedCheckbox.includes('heartbeat') && (
                    <Grid item xs={12}>
                      <PulsoForm classStyle={classes} />
                    </Grid>
                  )}
                  {selectedCheckbox.length > 0 && (
                    <Grid item container justify="space-between">
                      <Button disableElevation variant="contained">
                        Cancelar
                      </Button>
                      <Button disableElevation type="submit" variant="contained" color="primary">
                        Guardar
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </form>
            )}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PatientHEalthForm;
