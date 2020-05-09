import React, { useEffect } from 'react';
import { useRolesContext, withRolesContext } from './RolesContext';
import CustomSelectFieldComponent from '../../inputs/CustomSelectFieldComponent';
import useCustomStyles from '../../../jss/globalStyles';
import listAccess from '../../../commons/access';

function RoleFieldComponent({ userRole, disabled }) {
  const { roles, getRoles } = useRolesContext();

  useEffect(() => {
    getRoles();
  }, [getRoles]);

  const classes = useCustomStyles();
  return (
    <CustomSelectFieldComponent
      required
      disabled={disabled}
      className={classes.formControl}
      label="Tipo"
      name="role"
      source={roles.filter(rl => listAccess[userRole].includes(rl.id))}
    />
  );
}

export default withRolesContext(RoleFieldComponent);
