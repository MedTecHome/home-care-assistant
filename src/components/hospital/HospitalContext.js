import React, { createContext, useCallback, useContext, useMemo, useReducer, useState } from 'react';
import { isEmpty, isNil } from 'ramda';
import { fetchHospitalsAction, saveHospitalValuesAction } from './reducers/HospitalActions';
import setModalVisibleAction from '../../commons/reducers/GlobalActions';
import { GlobalReducer, initialGlobalState } from '../../commons/reducers/GlobalReducers';

const HospitalContext = createContext({});

const HospitalContextProvider = ({ children }) => {
  const [hospitals, setHospitals] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const [slected, setSelected] = useState(null);
  const [filters, setFilters] = useState({});
  const [modalState, modalDispatch] = useReducer(GlobalReducer, initialGlobalState, init => init);

  const hospitalsList = useMemo(() => hospitals, [hospitals]);
  const selected = useMemo(() => slected, [slected]);

  // eslint-disable-next-line no-unused-vars
  const getListHospitals = useCallback(async params => {
    setLoadingList(true);
    const result = await fetchHospitalsAction(params);
    setHospitals(result);
    setLoadingList(false);
  }, []);

  const selectHospital = useCallback(
    id => {
      const result = hospitalsList.find(item => item.id === id) || null;
      setSelected(result);
    },
    [hospitalsList]
  );

  const saveHospitalValues = useCallback(async (values, formType) => {
    await saveHospitalValuesAction(values, formType);
  }, []);

  const setModalVisible = useCallback((visible, formType) => {
    modalDispatch(setModalVisibleAction(visible, formType));
  }, []);

  return (
    <HospitalContext.Provider
      value={{
        hospitalsList,
        loadingList,
        selected,
        filters,
        ...modalState,
        getListHospitals,
        selectHospital,
        saveHospitalValues,
        setModalVisible,
        setFilters,
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
    hospitalsList: values.hospitalsList,
    selected: values.selected,
    loadingList: values.loadingList,
    filters: values.filters,
    modalVisible: values.modalVisible,
    formType: values.formType,
    getListHospitals: values.getListHospitals,
    selectHospital: values.selectHospital,
    saveHospitalValues: values.saveHospitalValues,
    setModalVisible: values.setModalVisible,
    setFilters: values.setFilters,
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
