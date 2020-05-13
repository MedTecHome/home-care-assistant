import React from 'react';
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';

import { testFormsNames } from '../../helpers/constants';
import useCustomStyles from '../../jss/globalStyles';

function SelectedChecboxForm({ defaultValues, onCheckboxChange }) {
  const { justifyCheckbox, noHoverBackground } = useCustomStyles();

  return (
    <FormControl
      style={{
        width: '100%'
      }}
      component="fieldset"
    >
      <FormLabel component="legend">Seleccione</FormLabel>
      <FormGroup className={justifyCheckbox} row defaultValue={defaultValues}>
        {Object.entries(testFormsNames).map(([key, value]) => (
          <FormControlLabel
            key={key}
            control={
              <Checkbox
                className={noHoverBackground}
                color="primary"
                disableRipple
                disableFocusRipple
                disableTouchRipple
                onChange={({ target: { checked, name } }) => onCheckboxChange(checked, name)}
                checked={defaultValues.includes(key)}
                name={key}
              />
            }
            label={`${value}`}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}

export default SelectedChecboxForm;
