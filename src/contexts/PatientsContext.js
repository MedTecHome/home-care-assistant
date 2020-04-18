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
    let list = [];
    listPatientsFetch(params).then(querySnapshot => {
      querySnapshot.forEach(doc => {
        list = [...list, { id: doc.id, ...doc.data() }];
      });
      dispatch(setListPatientsAction(list, 0));
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
