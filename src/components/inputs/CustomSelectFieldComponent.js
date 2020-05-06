import React from 'react';
import { Select } from 'mui-rff';
import MenuItem from '@material-ui/core/MenuItem';
import uuid from 'uuid4';
import clsx from 'clsx';
import useCustomStyles from '../../jss/globalStyles';

function CustomSelectFieldComponent({
  required = false,
  className,
  name,
  label,
  variant = 'standard',
  size = 'small',
  validate,
  source,
}) {
  const classes = useCustomStyles();
  return (
    <Select
      required={required}
      className={clsx(classes.formControl, className)}
      label={label}
      name={name}
      variant={variant}
      formControlProps={{
        size,
        color: 'primary',
      }}
      fieldProps={{
        validate,
      }}
    >
      <MenuItem key={uuid()} value="" />
      {source.map(item => (
        <MenuItem key={uuid()} value={item.id}>
          {item.name}
        </MenuItem>
      ))}
    </Select>
  );
}

export default CustomSelectFieldComponent;
