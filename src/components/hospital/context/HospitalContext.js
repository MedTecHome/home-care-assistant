import React, { createContext, useReducer } from 'react';
import { HospitalReducers, initialHispitalState } from './HospitalReducers';
import { FetchHospitals, SetListHospital } from './HospitalActions';
import mutationHospital from './mutationHospital';

export const HospitalContext = createContext();

export const HospitalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(HospitalReducers, initialHispitalState, (init) => init);
  const actions = {
    FetchHospitals: async (params) => {
      const result = await FetchHospitals(params);
      dispatch(SetListHospital({ list: mutationHospital(result.documents), total: 0 }));
    },
  };

  return (
    <HospitalContext.Provider
      value={{
        ...state,
        ...actions,
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};
