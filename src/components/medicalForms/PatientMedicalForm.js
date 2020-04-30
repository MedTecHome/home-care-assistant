import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { Form } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
import { isEmpty, isNil } from 'ramda';
import { green } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
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
import { AuthContext } from '../../contexts/AuthContext';

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
}));

const PatientMedicalForm = ({ location }) => {
  const {
    currentUserProfile: { id, fullname },
  } = useContext(AuthContext);
  const urlSearchParams = new URLSearchParams(location.search);
  const selectedCheckbox = urlSearchParams.getAll('formulario');
  const classes = useStyles();

  const onSubmit = async values => {
    if (!isNil(values) && !isEmpty(values)) {
      try {
        await saveHealthDataAction({ ...values, user: { id, fullname } });
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={3}
          md={3}
          lg={3}
          xl={3}
          style={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          <SelectedChecboxForm defaultValues={selectedCheckbox} />
        </Grid>
        <Grid item xs={12} sm={6} container>
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, form, submitting, pristine }) => (
              <form
                noValidate
                autoComplete="off"
                onSubmit={event => {
                  handleSubmit(event).then(() => {
                    form.reset();
                  });
                }}
              >
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
                      <div className={classes.wrapper}>
                        <Button
                          disabled={submitting || pristine}
                          disableElevation
                          type="submit"
                          variant="contained"
                          color="primary"
                        >
                          Guardar
                        </Button>
                        {submitting && <CircularProgress size={24} className={classes.buttonProgress} />}
                      </div>
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

export default PatientMedicalForm;
