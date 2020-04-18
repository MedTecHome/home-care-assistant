import React, { createContext, useReducer } from 'react';
import { initialPatientsState, PatientsReducers } from '../components/patients/reducers/PatientsReducers';
import {
  listPatientsFetch,
  saveDataOfPatientFetch,
  setListPatientsAction,
  setSelectedPatientsAction,
} from '../components/patients/reducers/PatientsActions';

export const PatientsContext = createContext({});

export const PatientsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PatientsReducers, initialPatientsState, init => init);

  const getListPatients = params => {
    listPatientsFetch(params).onSnapshot(querySnapshot => {
      let result = [];
      querySnapshot.forEach(doc => {
        result = [...result, { id: doc.id, ...doc.data() }];
      });
      dispatch(setListPatientsAction(result, 0));
    });
  };

  const selectPatients = selected => {
    dispatch(setSelectedPatientsAction(selected));
  };

  const savePatientsData = data => {
    saveDataOfPatientFetch(data);
  };

  return (
    <PatientsContext.Provider
      value={{
        ...state,
        getListPatients,
        selectPatients,
        savePatientsData,
      }}
    >
      {children}
    </PatientsContext.Provider>
  );
};
