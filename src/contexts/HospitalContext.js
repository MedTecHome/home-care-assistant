import React, { createContext, useReducer } from 'react';
import { HospitalReducers, initialHispitalState } from '../components/hospital/reducers/HospitalReducers';
import {
  fetchHospitalsAction,
  saveHospitalValuesAction,
  selectHospitalsFromListAction,
  setHospitalModalVisibleAction,
  setListHospitalAction,
} from '../components/hospital/reducers/HospitalActions';

export const HospitalContext = createContext({});

export const HospitalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(HospitalReducers, initialHispitalState, init => init);

  const selectHospitals = ids => {
    dispatch(selectHospitalsFromListAction(ids));
  };

  const fetchHospitals = params => {
    fetchHospitalsAction(params)
      .then(querySnapshot => {
        let result = [];
        querySnapshot.forEach(doc => {
          result = [...result, { id: doc.id, ...doc.data() }];
        });
        dispatch(setListHospitalAction({ list: result, total: 0 }));
      })
      // eslint-disable-next-line no-console
      .catch(e => console.error(e));
  };

  const setHospitalModalVisible = (flag, modalType) => {
    dispatch(setHospitalModalVisibleAction(flag, modalType));
  };

  const saveHospitalValues = (values, form) => {
    dispatch(saveHospitalValuesAction(values, form));
  };

  return (
    <HospitalContext.Provider
      value={{
        ...state,
        selectHospitals,
        fetchHospitals,
        setHospitalModalVisible,
        saveHospitalValues,
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};
