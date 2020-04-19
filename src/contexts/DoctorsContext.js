import React, { createContext, useContext, useReducer } from 'react';
import { isEmpty } from 'ramda';
import { DoctorsReducer, initialDoctorsState } from '../components/doctors/reducers/DoctorsReducers';
import {
  fetchListDoctorsAction,
  setListDoctorsAction,
  setSelectedDoctorsAction,
} from '../components/doctors/reducers/DoctorsActions';
import { saveHospitalValuesAction } from '../components/hospital/reducers/HospitalActions';

const DoctorsContext = createContext({});

const DoctorsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DoctorsReducer, initialDoctorsState, init => init);

  const getListDoctors = params => {
    fetchListDoctorsAction(params).onSnapshot(snapshot => {
      let result = [];
      snapshot.forEach(doc => {
        result = [...result, { id: doc.id, ...doc.data() }];
      });
      dispatch(setListDoctorsAction(result));
    });
  };

  const selectDoctors = selected => dispatch(setSelectedDoctorsAction(selected));

  const saveDoctorValues = (values, formType) => dispatch(saveHospitalValuesAction(values, formType));

  return (
    <DoctorsContext.Provider
      value={{
        ...state,
        getListDoctors,
        selectDoctors,
        saveDoctorValues,
      }}
    >
      {children}
    </DoctorsContext.Provider>
  );
};

export const useDoctorsContext = () => {
  const value = useContext(DoctorsContext);
  if (isEmpty(value)) throw new Error('Only works inside DoctorsContextProvider');
  return value;
};

export const useDoctorsContextProvider = WrapperComponent => () => {
  return (
    <DoctorsContextProvider>
      <WrapperComponent />
    </DoctorsContextProvider>
  );
};
