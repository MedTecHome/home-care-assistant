import React, { createContext, useCallback, useContext, useReducer } from 'react';
import { GlobalReducer, initialGlobalState } from '../commons/reducers/GlobalReducers';
import { getRolesAction, setRolesAction } from '../commons/reducers/GlobalActions';

const RolesContext = createContext({});

export const withRolesContext = WrapperComponent => props => {
  const [{ roles }, dispatch] = useReducer(GlobalReducer, initialGlobalState, init => init);

  const getRoles = useCallback(() => {
    getRolesAction()
      .orderBy('name')
      .onSnapshot(snapshot => {
        const result = snapshot.docChanges().map(({ doc }) => ({ id: doc.id, ...doc.data() }));
        dispatch(setRolesAction(result));
      });
  }, []);

  return (
    <RolesContext.Provider
      value={{
        roles,
        getRoles,
      }}
    >
      <WrapperComponent {...props} />
    </RolesContext.Provider>
  );
};

export const useRolesContext = () => {
  const values = useContext(RolesContext);
  if (!values) throw new Error('useRolesContext only works inside olesContextProvider');
  return {
    roles: values.roles,
    getRoles: values.getRoles,
  };
};
