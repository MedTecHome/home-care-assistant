import React, { createContext, useReducer } from 'react';
import { HospitalReducers, initialHispitalState } from '../components/hospital/reducers/HospitalReducers';
import {
  fetchHospitals,
  saveHospitalValues,
  selectHospitalFromList,
  selectHospitalsFromList,
  setHospitalModalVisible,
  setListHospital,
} from '../components/hospital/reducers/HospitalActions';

export const HospitalContext = createContext();

export const HospitalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(HospitalReducers, initialHispitalState, init => init);
  const actions = {
    selectHospitals(ids) {
      dispatch(selectHospitalsFromList(ids));
    },
    fetchHospitals(params) {
      fetchHospitals(params)
        .then(querySnapshot => {
          let result = [];
          querySnapshot.forEach(doc => {
            result = [...result, { id: doc.id, ...doc.data() }];
          });
          dispatch(setListHospital({ list: result, total: 0 }));
        })
        // eslint-disable-next-line no-console
        .catch(e => console.error(e));
    },
    setHospitalModalVisible(flag, modalType) {
      dispatch(setHospitalModalVisible(flag, modalType));
    },
    saveHospitalValues(values, form) {
      dispatch(saveHospitalValues(values, form));
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
