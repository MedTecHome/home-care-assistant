import React from 'react';
import { withRolesContext } from './RolesContext';
import CustomSelectFieldComponent from '../../inputs/CustomSelectFieldComponent';
import useCustomStyles from '../../../jss/globalStyles';

const listAccess = {
  doctor: ['patient'],
  admin: ['doctor'],
  developer: ['patient', 'doctor', 'admin'],
};

function RoleFieldComponent({ source, userRole }) {
  const classes = useCustomStyles();
  return (
    <CustomSelectFieldComponent
      required
      className={classes.formControl}
      label="Tipo"
      name="role"
      source={source.filter(rl => listAccess[userRole.id].includes(rl.id))}
    />
  );
}

export default withRolesContext(RoleFieldComponent);
