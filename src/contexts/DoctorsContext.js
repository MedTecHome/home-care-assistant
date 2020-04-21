import React, { createContext, useContext, useReducer } from 'react';
import { isEmpty, isNil } from 'ramda';
import { DoctorsReducer, initialDoctorsState } from '../components/doctors/reducers/DoctorsReducers';
import {
  getRefDoctorsAction,
  setListDoctorsAction,
  setSelectedDoctorAction,
  setTotalDoctorsAction,
} from '../components/doctors/reducers/DoctorsActions';
import { saveHospitalValuesAction } from '../components/hospital/reducers/HospitalActions';
import { setListLoadingAction } from '../components/patients/reducers/PatientsActions';
import { GlobalReducer, initialGlobalState } from '../commons/reducers/GlobalReducers';
import setModalVisibleAction from '../commons/reducers/GlobalActions';

const DoctorsContext = createContext({});

const DoctorsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DoctorsReducer, initialDoctorsState, init => init);
  const [modalState, modalDispatch] = useReducer(GlobalReducer, initialGlobalState, init => init);

  const getListDoctors = ({ limit = 5, next, prev }) => {
    dispatch(setListLoadingAction(true));
    let ref = getRefDoctorsAction();
    ref.onSnapshot(snapshot => dispatch(setTotalDoctorsAction(snapshot.data().total)));

    ref = ref.collection('doctors').orderBy('name');
    if (next) {
      ref = ref.startAfter(next).limit(limit);
    } else if (prev) {
      ref = ref.endBefore(prev).limitToLast(limit);
    } else {
      ref = ref.limit(limit);
    }
    ref
      .get()
      .then(snapshot => {
        const result = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        dispatch(setListDoctorsAction(result));
      })
      // eslint-disable-next-line no-console
      .catch(console.error)
      .finally(() => dispatch(setListLoadingAction(false)));
  };

  const selectDoctor = selected => dispatch(setSelectedDoctorAction(selected));

  const saveDoctorValues = (values, formType) => dispatch(saveHospitalValuesAction(values, formType));

  const setModalVisible = (visible, formType) => modalDispatch(setModalVisibleAction(visible, formType));

  return (
    <DoctorsContext.Provider
      value={{
        ...state,
        ...modalState,
        getListDoctors,
        selectDoctor,
        saveDoctorValues,
        setModalVisible,
      }}
    >
      {children}
    </DoctorsContext.Provider>
  );
};

export const withDoctorContext = WrapperComponent => () => {
  return (
    <DoctorsContextProvider>
      <WrapperComponent />
    </DoctorsContextProvider>
  );
};

export const useDoctorsContext = () => {
  const value = useContext(DoctorsContext);
  if (isNil(value) && isEmpty(value)) throw new Error('Only works wrapper DoctorsContextProvider');
  return {
    formType: value.formType,
    modalVisible: value.modalVisible,
    doctors: value.doctors,
    listLoading: value.listLoading,
    saveLoading: value.saveLoading,
    doctorSelected: value.doctorSelected,
    getListDoctors: value.getListDoctors,
    selectDoctor: value.selectDoctor,
    saveDoctorValues: value.saveDoctorValues,
    setModalVisible: value.setModalVisible,
  };
};
