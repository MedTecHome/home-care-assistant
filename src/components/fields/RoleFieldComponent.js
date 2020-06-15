import React, { useEffect, useState } from 'react';
import CustomSelectFieldComponent from '../inputs/CustomSelectFieldComponent';
import useCustomStyles from '../../jss/globalStyles';
import listAccess from '../../commons/access';
import getRoles from '../../services/roles';

function RoleFieldComponent({ userRole, disabled }) {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    getRoles(100, 0, {}).then(result => {
      setRoles(result.data.filter(item => listAccess[userRole].includes(item.id)));
    });
  }, [userRole]);

  const classes = useCustomStyles();
  return (
    <CustomSelectFieldComponent
      required
      disabled={disabled}
      className={classes.formControl}
      label="Tipo"
      name="role"
      source={roles}
    />
  );
}

export default RoleFieldComponent;
