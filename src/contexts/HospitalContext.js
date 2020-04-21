import React, { createContext, useCallback, useContext, useReducer } from 'react';
import { isEmpty, isNil } from 'ramda';
import { HospitalReducers, initialHispitalState } from '../components/hospital/reducers/HospitalReducers';
import {
  fetchHospitalsAction,
  saveHospitalValuesAction,
  selectHospitalsFromListAction,
  setListHospitalAction,
  setListHospitalLoadingAction,
  setSaveHospitalLoadingAction,
  setTotalHospitalAction,
} from '../components/hospital/reducers/HospitalActions';
import setGlobaModalVisibleAction from '../commons/reducers/GlobalActions';
import { GlobalReducer, initialGlobalState } from '../commons/reducers/GlobalReducers';

const HospitalContext = createContext({});

const HospitalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(HospitalReducers, initialHispitalState, init => init);
  const [modalState, modalDispatch] = useReducer(GlobalReducer, initialGlobalState, init => init);

  const getListHospitals = useCallback(({ limit = 5, next, prev }) => {
    dispatch(setListHospitalLoadingAction(true));
    fetchHospitalsAction().onSnapshot(snapshot => {
      dispatch(setTotalHospitalAction(snapshot.data().total));
    });
    let ref = fetchHospitalsAction().collection('hospitals').orderBy('name');
    if (next) {
      ref = ref.startAfter(next.name).limit(limit);
    } else if (prev) {
      ref = ref.endBefore(prev.name).limitToLast(limit);
    } else {
      ref = ref.limit(limit);
    }
    ref.onSnapshot(snapshot => {
      const result = snapshot.docChanges().map(({ doc }) => ({ id: doc.id, ...doc.data() }));
      dispatch(setListHospitalAction(result));
      dispatch(setListHospitalLoadingAction(false));
    });
  }, []);

  const selectHospital = useCallback(selected => {
    dispatch(selectHospitalsFromListAction(selected));
  }, []);

  const saveHospitalValues = useCallback((values, formType) => {
    dispatch(setSaveHospitalLoadingAction(true));
    saveHospitalValuesAction(values, formType)
      // eslint-disable-next-line no-console
      .then(console.info)
      // eslint-disable-next-line no-console
      .catch(console.error)
      .finally(() => dispatch(setSaveHospitalLoadingAction(false)));
  }, []);

  const setModalVisible = useCallback((visible, formType) => {
    modalDispatch(setGlobaModalVisibleAction(visible, formType));
  }, []);

  return (
    <HospitalContext.Provider
      value={{
        ...state,
        ...modalState,
        getListHospitals,
        selectHospital,
        saveHospitalValues,
        setModalVisible,
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospitalContext = () => {
  const values = useContext(HospitalContext);
  if (isEmpty(values) || isNil(values)) throw new Error('This hooks only works inside HospitalContextProvider');
  return {
    hospitals: values.hospitals,
    total: values.total,
    hospitalSelected: values.hospitalSelected,
    listLoading: values.listLoading,
    saveLoading: values.saveLoading,
    modalVisible: values.modalVisible,
    formType: values.formType,
    getListHospitals: values.getListHospitals,
    selectHospital: values.selectHospital,
    saveHospitalValues: values.saveHospitalValues,
    setModalVisible: values.setModalVisible,
  };
};

export const withHospitalContext = WrapperComponent => () => {
  return (
    <HospitalContextProvider>
      <WrapperComponent />
    </HospitalContextProvider>
  );
};
