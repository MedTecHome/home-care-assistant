import React from 'react';
import { Checkbox as MuiCheckbox, FormControlLabel, Typography } from '@material-ui/core';
import { Field } from 'react-final-form';

function CheckboxesFieldComponent({ required, disabled = false, namee, labelStyle, label, validate }) {
  return (
    <FormControlLabel
      color="primary"
      required={required}
      name={namee}
      disabled={disabled}
      label={<Typography className={labelStyle}>{label}</Typography>}
      control={
        <Field
          type="checkbox"
          name={namee}
          validate={validate}
          render={({ input: { name, value, onChange, checked, ...restInput } }) => (
            <MuiCheckbox
              color="primary"
              disabled={disabled}
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
