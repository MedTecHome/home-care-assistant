import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { TextField } from 'mui-rff';
import DateFieldComponent from '../fields/DateFieldComponent';
import TimeFieldComponent from '../fields/TimeFieldComponent';
import { validateBreathingFrecuency, validateEtCO, validatePI } from './validateMedicalForms';

function RespiracionForm({ classStyle }) {
  // const { register, errors } = useFormContext();
  return (
    <div className={classStyle.paper}>
      <Typography className={classStyle.titleForms} variant="subtitle1">
        Respiracion (Capnometría):
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            className={classStyle.formControl}
            name="EtCO"
            type="number"
            label="EtCO2:"
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="0 - 100 mmHg"
            fieldProps={{
              validate: validateEtCO,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            className={classStyle.formControl}
            name="breathingFrecuency"
            type="number"
            label="Frecuencia Respiratoria:"
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="20RPM"
            fieldProps={{
              validate: validateBreathingFrecuency,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            className={classStyle.formControl}
            name="breathingtPI"
            type="number"
            label="Indice Perfusion:"
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="5.5 %"
            fieldProps={{
              validate: validatePI,
            }}
          />
        </Grid>
        <DateFieldComponent classes={classStyle} name="breathingtDate" label="Dia" />
        <TimeFieldComponent label="Hora" name="breathingTime" classes={classStyle} />
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <TextField
            className={classStyle.formControl}
            size="small"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            rows={3}
            multiline
            label="Nota"
            name="breathingNote"
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default RespiracionForm;
