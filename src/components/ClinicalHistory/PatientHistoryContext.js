import React, { createContext, useCallback, useContext, useMemo, useReducer, useState } from 'react';
import { getAllPatientHistoryAction } from '../MedicalForms/reducers/PatienHealthActions';
import { GlobalReducer, initialGlobalState } from '../../commons/reducers/GlobalReducers';
import setModalVisibleAction from '../../commons/reducers/GlobalActions';
import { useMessageContext } from '../../MessageHandle/MessageContext';
import { ERROR_MESSAGE } from '../../commons/globalText';

const PatientHistoryContext = createContext({});

const PatientHistoryContextProvider = ({ children }) => {
  const { RegisterMessage } = useMessageContext();
  const [list, setHistoryList] = useState([]);
  const [slcted, setSelected] = useState(null);
  const [filters, setFilters] = useState({});
  const [loadingList, setLoadingList] = useState(false);
  const [modalState, modalDispath] = useReducer(GlobalReducer, initialGlobalState, init => init);

  const historyList = useMemo(() => list, [list]);
  const selected = useMemo(() => slcted, [slcted]);

  const getPatientHistory = useCallback(
    async params => {
      try {
        setLoadingList(true);
        const response = await getAllPatientHistoryAction(params);
        const result = response.sort((a, b) => {
          const c = a.clinicalDate;
          const d = b.clinicalDate;
          return d - c;
        });
        setHistoryList(result);
      } catch (e) {
        RegisterMessage(ERROR_MESSAGE, e);
      } finally {
        setLoadingList(false);
      }
    },
    [RegisterMessage]
  );

  const selectMedicalForm = useCallback(el => setSelected(el), []);

  const setModalVisible = useCallback((flag, formType) => modalDispath(setModalVisibleAction(flag, formType)), []);

  return (
    <PatientHistoryContext.Provider
      value={{
        historyList,
        loadingList,
        selected,
        filters,
        ...modalState,
        selectMedicalForm,
        getPatientHistory,
        setFilters,
        setModalVisible
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
    filters: values.filters,
    modalVisible: values.modalVisible,
    selected: values.selected,
    selectMedicalForm: values.selectMedicalForm,
    formType: values.formType,
    getPatientHistory: values.getPatientHistory,
    setModalVisible: values.setModalVisible,
    setFilters: values.setFilters
  };
};
