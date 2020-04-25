import React, { useEffect } from 'react';
import { Select } from 'mui-rff';
import MenuItem from '@material-ui/core/MenuItem';
import { useRolesContext, withRolesContext } from './roles/RolesContext';

function RoleFieldComponent({ classes }) {
  const { roles, getRoles } = useRolesContext();

  useEffect(() => {
    getRoles();
  }, [getRoles]);

  return (
    <Select
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
      {roles.map(role => (
        <MenuItem key={role.id} value={role.id}>
          {role.name}
        </MenuItem>
      ))}
    </Select>
  );
}

export default withRolesContext(RoleFieldComponent);
