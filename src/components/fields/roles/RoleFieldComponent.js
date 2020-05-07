import React, { useEffect } from 'react';
import { useRolesContext, withRolesContext } from './RolesContext';
import CustomSelectFieldComponent from '../../inputs/CustomSelectFieldComponent';
import useCustomStyles from '../../../jss/globalStyles';

const listAccess = {
  doctor: ['patient'],
  admin: ['doctor'],
  developer: ['patient', 'doctor', 'admin'],
};

function RoleFieldComponent({ userRole }) {
  const { roles, getRoles } = useRolesContext();

  useEffect(() => {
    getRoles();
  }, [getRoles]);

  const classes = useCustomStyles();
  return (
    <CustomSelectFieldComponent
      required
      className={classes.formControl}
      label="Tipo"
      name="role"
      source={roles.filter(rl => listAccess[userRole.id].includes(rl.id))}
    />
  );
}

export default withRolesContext(RoleFieldComponent);
