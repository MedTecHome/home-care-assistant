import React from 'react';
import { TextField } from 'mui-rff';
import Grid from '@material-ui/core/Grid';
import { Field } from 'react-final-form';
import { EDIT_FORM_TEXT } from '../../../commons/globalText';

export default function DoctorAndPatientFields({ classes, formType }) {
  return (
    <>
      {formType === EDIT_FORM_TEXT && <Field required name="id" type="hidden" component="input" />}
      <Grid item xs={12} sm={12} md={12}>
        <TextField
          required
          className={classes.formControl}
          InputLabelProps={{ shrink: true }}
          size="small"
          label="Nombre:"
          variant="outlined"
          name="name"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <TextField
          required
          className={classes.formControl}
          InputLabelProps={{ shrink: true }}
          size="small"
          label="Apellidos:"
          variant="outlined"
          name="lastName"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          type="number"
          className={classes.formControl}
          InputLabelProps={{ shrink: true }}
          size="small"
          label="Telefono:"
          variant="outlined"
          name="phone"
        />
      </Grid>
    </>
  );
}
