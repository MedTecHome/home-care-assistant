import React, { createContext, useCallback, useContext, useMemo, useReducer, useState } from 'react';
import { getAllPatientHistoryAction } from '../reducers/PatienHealthActions';
import { GlobalReducer, initialGlobalState } from '../../../commons/reducers/GlobalReducers';
import setModalVisibleAction from '../../../commons/reducers/GlobalActions';

const PatientHistoryContext = createContext({});

const PatientHistoryContextProvider = ({ children }) => {
  const [list, setHistoryList] = useState([]);
  const [slcted, setSelected] = useState(null);
  const [modalState, modalDispath] = useReducer(GlobalReducer, initialGlobalState, init => init);
  const [loadingList, setLoadingList] = useState(false);

  const historyList = useMemo(() => list, [list]);
  const selected = useMemo(() => slcted, [slcted]);

  const getPatientHistory = useCallback(async params => {
    try {
      setLoadingList(true);
      const response = await getAllPatientHistoryAction(params);
      const result = response.sort((a, b) => {
        const c = a.date.toDate().getTime();
        const d = b.date.toDate().getTime();
        return d - c;
      });
      setHistoryList(result);
    } catch (e) {
      // /handle error
    } finally {
      setLoadingList(false);
    }
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
    getPatientHistory: values.getPatientHistory,
    setModalVisible: values.setModalVisible,
  };
};
