import React from 'react';
import { Select } from 'mui-rff';
import uuid from 'uuid4';
import MenuItem from '@material-ui/core/MenuItem';
import { withRolesContext } from './RolesContext';

const listAccess = {
  doctor: ['patient'],
  admin: ['doctor'],
  developer: ['patient', 'doctor', 'admin'],
};

function RoleFieldComponent({ source, classes, userRole }) {
  return (
    <Select
      required
      className={classes.formControl}
      label="Tipo"
      name="role"
      variant="outlined"
      formControlProps={{
        size: 'small',
      }}
      fieldProps={{
        InputLabelProps: {
          shrink: true,
        },
      }}
    >
      <MenuItem key={uuid()} value="" />
      {source
        .filter(rl => listAccess[userRole.id].includes(rl.id))
        .map(role => (
          <MenuItem key={uuid()} value={role.id}>
            {role.name}
          </MenuItem>
        ))}
    </Select>
  );
}

export default withRolesContext(RoleFieldComponent);
