import React from 'react';
import { TextField } from 'mui-rff';
import clsx from 'clsx';
import useCustomStyles from '../../jss/globalStyles';

function CustomTextFieldComponent({
  disabled = false,
  required,
  className,
  type = 'text',
  size = 'small',
  label,
  variant = 'outlined',
  name,
  validate,
  textAlign = 'normal',
  multiline,
  rows,
  rowsMax,
  labelStyle,
  placeholder
}) {
  const classes = useCustomStyles();
  return (
    <TextField
      className={clsx(classes, className)}
      required={required}
      disabled={disabled}
      type={type}
      name={name}
      label={label}
      color="primary"
      size={size}
      variant={variant}
      multiline={multiline}
      rows={rows}
      rowsMax={rowsMax}
      placeholder={placeholder}
      fieldProps={{
        disabled,
        validate
      }}
      InputLabelProps={{
        ...(labelStyle ? { style: labelStyle } : {})
      }}
      inputProps={{
        disabled,
        style: {
          textAlign
        }
      }}
    />
  );
}

export default CustomTextFieldComponent;
