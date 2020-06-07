import React, { useState, useCallback } from 'react';
import { Container, Grid, Button, makeStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { Form } from 'react-final-form';

import { isEmpty } from '../../helpers/utils';
import SaveButton from '../buttons/SaveButton';
import { useAuthContext } from '../../contexts/AuthContext';
import saveHealthDataAction from './actions/PatienHealthActions';
import SelectedChecboxForm from './SelectedCheckboxForm';
import BreathingForm from './BreathingForm';
import PressureForm from './PressureForm';
import HeartrateForm from './HeartrateForm';
import TemperatureForm from './TemperatureForm';
import GlucoseForm from './GlucoseForm';
import WeightForm from './WeightForm';
import OxygenForm from './OxygenForm';
import ExercisesForm from './ExercisesForm';
import CoagulationForm from './CoagulationForm';
import { useMessageContext } from '../../MessageHandle/MessageContext';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../commons/globalText';
import OthersForms from './OthersForm';

const useStyles = makeStyles(theme => ({
  formContainer: {
    maxWidth: 340
  },
  formControl: {
    width: '100%'
  },
  titleForms: {
    color: theme.palette.grey['600'],
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 10
  },
  wrapper: {
    position: 'relative'
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  textOverflow: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    paddingLeft: 5
  }
}));

const PatientMedicalForm = () => {
  const { RegisterMessage } = useMessageContext();
  const {
    currentUserProfile: { id }
  } = useAuthContext();
  const classes = useStyles();
  const [selectedForms, setSelectedForms] = useState([]);

  const onSubmit = async (values, form) => {
    if (!isEmpty(values)) {
      try {
        await saveHealthDataAction({ ...values, user: id, forms: selectedForms });
        RegisterMessage(SUCCESS_MESSAGE, 'Información guardada', 'PatientMedicalForm');
      } catch (e) {
        RegisterMessage(ERROR_MESSAGE, e, 'PatientMedicalForm');
      }
    }
    setTimeout(form.reset);
  };

  const handleToogleCheckbox = useCallback(
    (checked, form) => {
      if (checked) setSelectedForms([...selectedForms, form]);
      else setSelectedForms([...selectedForms.filter(f => f !== form)]);
    },
    [selectedForms]
  );

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid className={classes.textOverflow} item xs={12} sm={3} md={2} lg={2} xl={2}>
          <SelectedChecboxForm defaultValues={selectedForms} onCheckboxChange={handleToogleCheckbox} />
        </Grid>
        <Grid item xs={12} sm={9} container direction="column">
          <Form
            initialValues={{
              glucoseUnity: 'mg/dl'
            }}
            onSubmit={onSubmit}
            render={({ handleSubmit, form, submitting, pristine, invalid, values }) => {
              return (
                <form
                  autoComplete="off"
                  onSubmit={event => {
                    event.preventDefault();
                    if (!invalid) handleSubmit(event);
                  }}
                >
                  <Grid container spacing={4} justify={selectedForms.length === 1 ? 'center' : null}>
                    {selectedForms.includes('pressure') && (
                      <Grid item xs={12} sm={10} md={6}>
                        <PressureForm classStyle={classes} />
                      </Grid>
                    )}
                    {selectedForms.includes('heartrate') && (
                      <Grid item xs={12} sm={10} md={6}>
                        <HeartrateForm classStyle={classes} />
                      </Grid>
                    )}
                    {selectedForms.includes('temperature') && (
                      <Grid item xs={12} sm={10} md={6}>
                        <TemperatureForm classStyle={classes} />
                      </Grid>
                    )}
                    {selectedForms.includes('glucose') && (
                      <Grid item xs={12} sm={10} md={6}>
                        <GlucoseForm classStyle={classes} />
                      </Grid>
                    )}
                    {selectedForms.includes('weight') && (
                      <Grid item xs={12} sm={10} md={6}>
                        <WeightForm classStyle={classes} />
                      </Grid>
                    )}
                    {selectedForms.includes('breathing') && (
                      <Grid item xs={12} sm={10} md={6}>
                        <BreathingForm classStyle={classes} />
                      </Grid>
                    )}
                    {selectedForms.includes('inr') && (
                      <Grid item xs={12} sm={10} md={6}>
                        <CoagulationForm classStyle={classes} />
                      </Grid>
                    )}
                    {selectedForms.includes('oxygen') && (
                      <Grid item xs={12} sm={10} md={6}>
                        <OxygenForm classStyle={classes} />
                      </Grid>
                    )}
                    {selectedForms.includes('exercises') && (
                      <Grid item xs={12} sm={10} md={6}>
                        <ExercisesForm classStyle={classes} />
                      </Grid>
                    )}
                    {selectedForms.includes('others') && (
                      <Grid item xs={12} sm={10} md={6}>
                        <OthersForms classStyle={classes} testName={values.othersName} />
                      </Grid>
                    )}
                  </Grid>
                  {selectedForms.length > 0 && (
                    <Grid item xs={12} container justify="center" spacing={4}>
                      <Grid item>
                        <Button color="secondary" onClick={() => form.reset()}>
                          Cancelar
                        </Button>
                      </Grid>
                      <Grid item>
                        <SaveButton invalid={invalid} pristine={pristine} submitting={submitting} />
                      </Grid>
                    </Grid>
                  )}
                </form>
              );
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PatientMedicalForm;
