import React from 'react';
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, Typography } from '@material-ui/core';
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
      <FormLabel component="legend">
        <Typography
          variant="button"
          style={{
            fontSize: 16
          }}
        >
          Seleccione
        </Typography>
      </FormLabel>
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
            label={
              <Typography
                variant="button"
                style={{
                  fontWeight: 550
                }}
              >{`${value}`}</Typography>
            }
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}

export default SelectedChecboxForm;
