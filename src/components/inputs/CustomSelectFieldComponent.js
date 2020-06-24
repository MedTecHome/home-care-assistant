import React from 'react';
import { Select } from 'mui-rff';
import MenuItem from '@material-ui/core/MenuItem';
import clsx from 'clsx';
import { CircularProgress } from '@material-ui/core';
import useCustomStyles from '../../jss/globalStyles';

function CustomSelectFieldComponent({
  waiting = false,
  required = false,
  className,
  name,
  label,
  variant = 'outlined',
  size = 'medium',
  validate,
  source,
  disabled
}) {
  const classes = useCustomStyles();

  return (
    <Select
      required={required}
      className={clsx(classes.formControl, className)}
      label={label}
      name={name}
      variant={variant}
      startAdornment={waiting ? <CircularProgress size={20} /> : null}
      formControlProps={{
        disabled,
        size,
        color: 'primary'
      }}
      fieldProps={{
        format: value => (source.length > 0 ? value || '' : ''),
        validate
      }}
    >
      <MenuItem value="">Ninguno</MenuItem>
      {source.map(item => (
        <MenuItem key={item.id} value={item.id}>
          {`${item.name} ${item.measure ? `(${item.measure})` : (item.abbreviation && `(${item.abbreviation})`) || ''}`}
        </MenuItem>
      ))}
    </Select>
  );
}

export default CustomSelectFieldComponent;
