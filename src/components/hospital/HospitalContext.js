import React, { createContext, useCallback, useContext, useReducer } from 'react';
import { isEmpty, isNil } from 'ramda';
import { HospitalReducers, initialHispitalState } from './reducers/HospitalReducers';
import {
  fetchHospitalsAction,
  saveHospitalValuesAction,
  selectHospitalsFromListAction,
  setListHospitalAction,
  setListHospitalLoadingAction,
} from './reducers/HospitalActions';
import setModalVisibleAction from '../../commons/reducers/GlobalActions';
import { GlobalReducer, initialGlobalState } from '../../commons/reducers/GlobalReducers';

const HospitalContext = createContext({});

const HospitalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(HospitalReducers, initialHispitalState, init => init);
  const [modalState, modalDispatch] = useReducer(GlobalReducer, initialGlobalState, init => init);

  // eslint-disable-next-line no-unused-vars
  const getListHospitals = useCallback(async ({ limit = 5, next, prev, filters }) => {
    dispatch(setListHospitalLoadingAction(true));
    let ref = fetchHospitalsAction().collection('hospitals').orderBy('name');
    /* if (next) {
      ref = ref.startAfter(next.name).limit(limit);
    } else if (prev) {
      ref = ref.endBefore(prev.name).limitToLast(limit);
    } else {
      ref = ref.limit(limit);
    } */

    if (filters && !isEmpty(filters)) {
      Object.keys(filters).map(k => {
        ref = ref.where(k, '>=', filters[k]);
        return null;
      });
    }
    const result = (await ref.get()).docs().map(({ doc }) => ({
      id: doc.id,
      createdAt: doc.createTime,
      updatedAt: doc.updateTime,
      ...doc.data(),
    }));
    dispatch(setListHospitalAction(result));
    dispatch(setListHospitalLoadingAction(false));
  }, []);

  const selectHospital = useCallback(selected => {
    dispatch(selectHospitalsFromListAction(selected));
  }, []);

  const saveHospitalValues = useCallback(async (values, formType) => {
    await saveHospitalValuesAction(values, formType);
  }, []);

  const setModalVisible = useCallback((visible, formType) => {
    modalDispatch(setModalVisibleAction(visible, formType));
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

export const withHospitalContext = WrapperComponent => props => {
  return (
    <HospitalContextProvider>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <WrapperComponent {...props} />
    </HospitalContextProvider>
  );
};
