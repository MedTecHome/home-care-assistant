import React from 'react';
import { Checkbox as MuiCheckbox, FormControlLabel } from '@material-ui/core';
import { Field } from 'react-final-form';

function CheckboxesFieldComponent({ required, namee, label }) {
  return (
    <FormControlLabel
      required={required}
      name={namee}
      label={label}
      control={
        <Field
          type="checkbox"
          name={namee}
          render={({ input: { name, value, onChange, checked, ...restInput } }) => (
            <MuiCheckbox
              name={name}
              value={value}
              onChange={onChange}
              checked={checked}
              inputProps={{ required, ...restInput }}
            />
          )}
        />
      }
    />
  );
}

export default CheckboxesFieldComponent;
