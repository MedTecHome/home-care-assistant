import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import DoctorReducers, { initialState } from './DoctorReducers';

export const DoctorContext = createContext();

export function DoctorContextProvider({ children }) {
  const [state, dispatch] = useReducer(DoctorReducers, initialState);

  const DoctorsAction = {
    SelectDoctor: async (id) => {
      const response = await axios.get(`doctors/?${id}`);
      dispatch();
    },
  };

  return <DoctorContext.Provider value={{ state, ...DoctorsAction }}>{children}</DoctorContext.Provider>;
}
