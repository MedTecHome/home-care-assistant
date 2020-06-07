import React from 'react';
import Grid from '@material-ui/core/Grid';
import { KeyboardDatePicker } from 'mui-rff';
import MomentUtils from '@date-io/moment';
import ProfileFieldComponent from './ProfileFieldComponent';
import { validateBirthday, validateDoctor, validateHeight } from '../Profiles/forms/validateProfile';
import useCustomStyles from '../../jss/globalStyles';
import CustomTextFieldComponent from '../inputs/CustomTextFieldComponent';
import SexFieldComponent from './SexFieldComponent';
import { useAuthContext } from '../../contexts/AuthContext';
import { EDIT_FORM_TEXT } from '../../commons/globalText';

function PatientsFieldComponent({ formType }) {
  const classes = useCustomStyles();
  const { isAdmin } = useAuthContext();
  return (
    <>
      <Grid item xs={12} sm={8}>
        <KeyboardDatePicker
          required
          disabled={formType === EDIT_FORM_TEXT}
          dateFunsUtils={MomentUtils}
          className={classes.formControl}
          size="small"
          variant="inline"
          label="Fecha de nacimiento"
          autoOk
          placeholder="DD/MM/YYYY"
          format="DD/MM/YYYY"
          name="birthday"
          inputVariant="outlined"
          fieldProps={{
            validate: validateBirthday
          }}
        />
      </Grid>
      <Grid item xs={4} />
      <Grid item xs={8} sm={4}>
        <SexFieldComponent
          className={classes.formControl}
          name="sex"
          label="Género"
          required
          disabled={formType === EDIT_FORM_TEXT}
        />
      </Grid>
      <Grid item xs={4}>
        <CustomTextFieldComponent
          validate={validateHeight}
          name="height"
          label="Estatura (cm)"
          required
          textAlign="right"
          placeholder="cm"
          disabled={formType === EDIT_FORM_TEXT}
        />
      </Grid>
      {isAdmin && (
        <Grid item xs={12} md={12}>
          <ProfileFieldComponent
            required
            name="doctor"
            label="Doctor"
            filterRole="doctor"
            validate={validateDoctor}
            classes={classes}
          />
        </Grid>
      )}
    </>
  );
}

export default PatientsFieldComponent;
