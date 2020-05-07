import React from 'react';
import Grid from '@material-ui/core/Grid';
import { KeyboardDatePicker } from 'mui-rff';
import MomentUtils from '@date-io/moment';
import ProfileFieldComponent from './ProfileFieldComponent';
import { validateBirthday, validateDoctor, validateHeight } from '../profiles/forms/valdiateProfile';
import useCustomStyles from '../../jss/globalStyles';
import CustomTextFieldComponent from '../inputs/CustomTextFieldComponent';
import SexFieldComponent from './SexFieldComponent';

function PatientsFieldComponent({ role }) {
  const classes = useCustomStyles();
  return (
    <>
      <Grid item xs={6}>
        <SexFieldComponent name="sex" label="Sexo" required />
      </Grid>
      <Grid item xs={8} sm={8} md={8}>
        <KeyboardDatePicker
          required
          dateFunsUtils={MomentUtils}
          className={classes.formControl}
          size="small"
          variant="inline"
          label="Fecha de nacimiento"
          autoOk
          placeholder="DD/MM/YYYY"
          format="DD/MM/YYYY"
          name="birthday"
          fieldProps={{
            validate: validateBirthday,
          }}
        />
      </Grid>
      <Grid item xs={4} sm={4} md={4}>
        <CustomTextFieldComponent validate={validateHeight} name="height" label="Estatura" required textAlign="right" />
      </Grid>
      <Grid item xs={12}>
        <CustomTextFieldComponent name="address" label="Direccion" />
      </Grid>
      <Grid item xs={12} md={12}>
        <ProfileFieldComponent
          required
          name="doctor"
          label="Doctor"
          filterRole="doctor"
          validate={validateDoctor}
          classes={classes}
          disabled={role.id === 'doctor'}
        />
      </Grid>
    </>
  );
}

export default PatientsFieldComponent;
