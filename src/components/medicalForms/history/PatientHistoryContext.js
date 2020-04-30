import React, { createContext, useCallback, useContext, useMemo, useReducer, useState } from 'react';
import { getAllPatientHistoryAction } from '../reducers/PatienHealthActions';
import { GlobalReducer, initialGlobalState } from '../../../commons/reducers/GlobalReducers';
import setModalVisibleAction from '../../../commons/reducers/GlobalActions';
import { AuthContext } from '../../../contexts/AuthContext';

const PatientHistoryContext = createContext({});

const PatientHistoryContextProvider = ({ children }) => {
  const { currentUserProfile } = useContext(AuthContext);
  const [list, setHistoryList] = useState([]);
  const [slcted, setSelected] = useState(null);
  const [ftrs, setFilters] = useState({ type: 'all', 'user.id': currentUserProfile.id });
  const [modalState, modalDispath] = useReducer(GlobalReducer, initialGlobalState, init => init);

  const historyList = useMemo(() => list, [list]);
  const selected = useMemo(() => slcted, [slcted]);
  const filters = useMemo(() => ftrs, [ftrs]);

  const [loadingList, setLoadingList] = useState(false);

  const getPatientHistory = useCallback(async params => {
    setLoadingList(true);
    try {
      const response = await getAllPatientHistoryAction(params);
      console.log(response);
      const result = response.sort((a, b) => {
        const c = a.date.toDate().getTime();
        const d = b.date.toDate().getTime();
        return d - c;
      });
      setHistoryList(result);
    } catch (e) {
      // /handle error
    }
    setLoadingList(false);
  }, []);

  const selectMedicalForm = useCallback(el => setSelected(el), []);

  const setModalVisible = useCallback((flag, formType) => modalDispath(setModalVisibleAction(flag, formType)), []);

  return (
    <PatientHistoryContext.Provider
      value={{
        historyList,
        loadingList,
        selected,
        ...modalState,
        filters,
        setFilters,
        selectMedicalForm,
        getPatientHistory,
        setModalVisible,
      }}
    >
      {children}
    </PatientHistoryContext.Provider>
  );
};

export const withPatientHistoryContext = WrapperComponent => props => {
  return (
    <PatientHistoryContextProvider>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <WrapperComponent {...props} />
    </PatientHistoryContextProvider>
  );
};

export const usePatientHistoryContext = () => {
  const values = useContext(PatientHistoryContext);
  if (!values) throw new Error('This works only inside PatientHistoryContextProvider');
  return {
    historyList: values.historyList,
    loadingList: values.loadingList,
    modalVisible: values.modalVisible,
    selected: values.selected,
    selectMedicalForm: values.selectMedicalForm,
    formType: values.formType,
    filters: values.filters,
    setFilters: values.setFilters,
    getPatientHistory: values.getPatientHistory,
    setModalVisible: values.setModalVisible,
  };
};
