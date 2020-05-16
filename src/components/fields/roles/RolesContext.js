import React, { createContext, useCallback, useContext, useState } from 'react';
import { getRolesAction } from './reducers/RoleActions';
import { useMessageContext } from '../../../MessageHandle/MessageContext';
import { ERROR_MESSAGE } from '../../../commons/globalText';

const RolesContext = createContext({});

export const withRolesContext = WrapperComponent => props => {
  const { RegisterMessage } = useMessageContext();
  const [roles, setRoles] = useState([]);

  const getRoles = useCallback(async () => {
    try {
      const result = (await getRolesAction().orderBy('name').get())
        .docChanges()
        .map(({ doc }) => ({ id: doc.id, ...doc.data() }));
      setRoles(result);
    } catch (e) {
      RegisterMessage(ERROR_MESSAGE, e, 'RoleContext');
    }
  }, [RegisterMessage]);

  return (
    <RolesContext.Provider
      value={{
        roles,
        getRoles
      }}
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <WrapperComponent {...props} />
    </RolesContext.Provider>
  );
};

export const useRolesContext = () => {
  const values = useContext(RolesContext);
  if (!values) throw new Error('useRolesContext only works inside olesContextProvider');
  return {
    roles: values.roles,
    getRoles: values.getRoles
  };
};
