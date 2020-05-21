import React from 'react';
import { Checkbox as MuiCheckbox, FormControlLabel, Typography } from '@material-ui/core';
import { Field } from 'react-final-form';

function CheckboxesFieldComponent({ required, namee, label, labelStyle, validate }) {
  return (
    <FormControlLabel
      required={required}
      name={namee}
      label={<Typography style={labelStyle}>{label}</Typography>}
      control={
        <Field
          type="checkbox"
          name={namee}
          validate={validate}
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
