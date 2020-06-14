import React from 'react';
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, Typography, Tooltip } from '@material-ui/core';
import { testFormsNames } from '../../helpers/constants';
import useCustomStyles from '../../jss/globalStyles';

function SelectedChecboxForm({ defaultValues, onCheckboxChange }) {
  const { justifyCheckbox, formControl } = useCustomStyles();

  return (
    <FormControl className={formControl} component="fieldset">
      <FormLabel component="legend">
        <Typography variant="button">Seleccione</Typography>
      </FormLabel>
      <FormGroup className={justifyCheckbox} row defaultValue={defaultValues}>
        {testFormsNames.map(value => (
          <FormControlLabel
            key={value.id}
            control={
              <Checkbox
                color="primary"
                disableRipple
                disableFocusRipple
                disableTouchRipple
                onChange={({ target: { checked, name } }) => onCheckboxChange(checked, name)}
                checked={defaultValues.includes(value.id)}
                name={value.id}
              />
            }
            label={
              <Tooltip title={value.name}>
                <Typography variant="button">{`${value.name}`}</Typography>
              </Tooltip>
            }
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}

export default SelectedChecboxForm;
