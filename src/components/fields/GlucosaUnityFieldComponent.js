import React from 'react';
import { Radio } from 'final-form-material-ui';
import { RadioGroup, FormControlLabel, Typography } from '@material-ui/core';
import { Field } from 'react-final-form';
import Fieldset from '../fieldset';

function GlucosanityFieldComponent({ namee, validate, required }) {
  return (
    <Fieldset title={<Typography>Unidad glucosa</Typography>}>
      <RadioGroup row>
        <FormControlLabel
          required={required}
          label="mg/dl"
          name={namee}
          control={<Field name={namee} component={Radio} type="radio" value="mg/dl" validate={validate} />}
        />
        <FormControlLabel
          required={required}
          label="mmol/l"
          name={namee}
          control={<Field name={namee} component={Radio} type="radio" value="mmol/l" validate={validate} />}
        />
      </RadioGroup>
    </Fieldset>
  );
}

export default GlucosanityFieldComponent;
