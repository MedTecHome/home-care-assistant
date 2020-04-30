import React from 'react';
import Grid from '@material-ui/core/Grid';
import { KeyboardDatePicker } from 'mui-rff';
import MomentUtils from '@date-io/moment';
import HeightFieldComponent from './HeightFieldComponent';
import AddressFieldComponent from './AddressFieldComponent';
import DoctorFieldComponent from './DoctorFieldComponent';

function PatientsFieldComponent({ classes, userRole }) {
  return (
    <>
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
        <HeightFieldComponent classes={classes} />
      </Grid>
      <Grid item xs={12}>
        <AddressFieldComponent classes={classes} />
      </Grid>
      <Grid item xs={12} md={12}>
        <DoctorFieldComponent classes={classes} userRole={userRole} />
      </Grid>
    </>
  );
}

export default PatientsFieldComponent;
