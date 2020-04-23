import React, { useEffect } from 'react';
import { Select } from 'mui-rff';
import MenuItem from '@material-ui/core/MenuItem';
import { useRolesContext, withRolesContext } from '../../contexts/RolesContext';

function RoleFieldComponent({ classes }) {
  const { roles, getRoles } = useRolesContext();

  useEffect(() => {
    getRoles();
  }, [getRoles]);

  return (
    <Select
      defaultValue=""
      className={classes.formControl}
      label="Tipo"
      name="roleId"
      variant="outlined"
      formControlProps={{
        size: 'small',
      }}
      fieldProps={{
        size: 'small',
        InputLabelProps: {
          shrink: true,
          size: 'small',
        },
      }}
    >
      <MenuItem key="none" value="">
        None
      </MenuItem>
      {roles.map(role => (
        <MenuItem key={role.id} value={role.id}>
          {role.name}
        </MenuItem>
      ))}
    </Select>
  );
}

export default withRolesContext(RoleFieldComponent);
