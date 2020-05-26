import React, { createContext, useCallback, useContext, useMemo, useReducer, useState } from 'react';
import { getAllPatientHistoryAction } from '../MedicalForms/actions/PatienHealthActions';
import { GlobalReducer, initialGlobalState } from '../../commons/actions/GlobalReducers';
import setModalVisibleAction from '../../commons/actions/GlobalActions';
import { useMessageContext } from '../../MessageHandle/MessageContext';
import { ERROR_MESSAGE } from '../../commons/globalText';

const PatientHistoryContext = createContext({});

const PatientHistoryContextProvider = ({ children }) => {
  const { RegisterMessage } = useMessageContext();
  const [list, setHistoryList] = useState([]);
  const [total, setTotal] = useState(0);
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
        const response = await getAllPatientHistoryAction({ ...params, filters });
        const result = response.data.sort((a, b) => {
          const c = a.clinicalDate;
          const d = b.clinicalDate;
          return d - c;
        });
        setHistoryList(result);
        setTotal(response.total);
      } catch (e) {
        RegisterMessage(ERROR_MESSAGE, e, 'PatientHistoryContext');
      } finally {
        setLoadingList(false);
      }
    },
    [filters, RegisterMessage]
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
        total,
        ...modalState,
        selectMedicalForm,
        getPatientHistory,
        setFilters,
        setModalVisible,
        setTotal
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
    total: values.total,
    selectMedicalForm: values.selectMedicalForm,
    formType: values.formType,
    getPatientHistory: values.getPatientHistory,
    setModalVisible: values.setModalVisible,
    setFilters: values.setFilters,
    setTotal: values.setTotal
  };
};
