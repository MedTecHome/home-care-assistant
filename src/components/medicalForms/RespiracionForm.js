import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DateFieldComponent from '../fields/DateFieldComponent';
import TimeFieldComponent from '../fields/TimeFieldComponent';
import { validateBreathingFrecuency, validateEtCO, validatePI } from './validateMedicalForms';
import CustomTextFieldComponent from '../inputs/CustomTextFieldComponent';

function RespiracionForm({ classStyle }) {
  // const { register, errors } = useFormContext();
  return (
    <div className={classStyle.paper}>
      <Typography className={classStyle.titleForms} variant="subtitle1">
        Respiracion (Capnometría)
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomTextFieldComponent
            required
            name="EtCO"
            type="number"
            label="EtCO2:"
            placeholder="0 - 100 mmHg"
            validate={validateEtCO}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextFieldComponent
            required
            name="breathingFrecuency"
            type="number"
            label="Frecuencia Respiratoria:"
            placeholder="20RPM"
            validate={validateBreathingFrecuency}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextFieldComponent
            required
            name="breathingPI"
            type="number"
            label="Indice Perfusion:"
            placeholder="5.5 %"
            validate={validatePI}
          />
        </Grid>
        <DateFieldComponent classes={classStyle} name="breathingtDate" label="Dia" />
        <TimeFieldComponent label="Hora" name="breathingTime" classes={classStyle} />
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <CustomTextFieldComponent rows={3} multiline label="Nota" name="breathingNote" />
        </Grid>
      </Grid>
    </div>
  );
}

export default RespiracionForm;
