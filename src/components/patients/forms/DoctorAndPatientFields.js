import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Field } from 'react-final-form';
import NameFieldComponent from '../../fields/NameFieldComponent';
import LastNameFieldComponent from '../../fields/LastNameFieldComponent';
import PhoneFieldComponent from '../../fields/PhoneFieldComponent';
import { EDIT_FORM_TEXT } from '../../../commons/globalText';

export default function DoctorAndPatientFields({ classes, formType }) {
  return (
    <>
      {formType === EDIT_FORM_TEXT && <Field required name="id" type="hidden" component="input" />}
      <Grid item xs={12} sm={12} md={12}>
        <NameFieldComponent classes={classes} />
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <LastNameFieldComponent classes={classes} />
      </Grid>
      <Grid item xs={12}>
        <PhoneFieldComponent classes={classes} />
      </Grid>
    </>
  );
}
