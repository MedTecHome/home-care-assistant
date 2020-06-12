import React, { createContext, useCallback, useContext, useReducer, useState, useEffect, useRef } from 'react';
import { GlobalReducer, initialGlobalState } from '../../commons/actions/GlobalReducers';
import setModalVisibleAction from '../../commons/actions/GlobalActions';
import { useMessageContext } from '../../MessageHandle/MessageContext';
import { ERROR_MESSAGE } from '../../commons/globalText';
import getClinicalTests from '../../services/clinicaltest';
import { useCustomPaginationContext } from '../pagination/PaginationContext';

const PatientHistoryContext = createContext({});

const PatientHistoryContextProvider = ({ children }) => {
  const { RegisterMessage } = useMessageContext();
  const [historyList, setHistoryList] = useState([]);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState(null);
  const [params, setParams] = useState({});
  const { pageSize, page, resetPagination } = useCustomPaginationContext();
  const [loadingList, setLoadingList] = useState(false);
  const [modalState, modalDispath] = useReducer(GlobalReducer, initialGlobalState, init => init);
  const mounted = useRef(true);

  const fetchList = useCallback(
    async (user, limit, pag, filters, type) => {
      try {
        const result = await getClinicalTests(limit, pag, { user, ...filters }, type);
        if (mounted.current === true) {
          setHistoryList(result.data);
          setTotal(result.total);
          setLoadingList(false);
        }
      } catch (e) {
        RegisterMessage(ERROR_MESSAGE, e, 'PatienhistoryCOmponent');
      }
    },
    [RegisterMessage]
  );

  useEffect(() => {
    mounted.current = true;
    const { type, user, rangeDate, ...filters } = params;
    if (user && rangeDate && rangeDate[0] && rangeDate[1]) {
      setLoadingList(true);
      fetchList(user, pageSize, page, { ...filters, rangeDate }, type);
    }
    return () => {
      mounted.current = false;
    };
  }, [params, pageSize, page, fetchList]);

  const selectMedicalForm = useCallback(el => setSelected(el), []);

  const setModalVisible = useCallback((flag, formType) => modalDispath(setModalVisibleAction(flag, formType)), []);

  return (
    <PatientHistoryContext.Provider
      value={{
        historyList,
        loadingList,
        selected,
        params,
        total,
        ...modalState,
        selectMedicalForm,
        setParams,
        setModalVisible,
        resetPagination
      }}
    >
      {children}
    </PatientHistoryContext.Provider>
  );
};

export const withPatientHistoryContext = WrapperComponent => ({ defaultTest, patient, children }) => {
  return (
    <PatientHistoryContextProvider>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <WrapperComponent defaultTest={defaultTest} patient={patient}>
        {children}
      </WrapperComponent>
    </PatientHistoryContextProvider>
  );
};

export const usePatientHistoryContext = () => {
  const values = useContext(PatientHistoryContext);
  if (!values) throw new Error('This works only inside PatientHistoryContextProvider');
  return {
    historyList: values.historyList,
    loadingList: values.loadingList,
    params: values.params,
    modalVisible: values.modalVisible,
    selected: values.selected,
    total: values.total,
    selectMedicalForm: values.selectMedicalForm,
    formType: values.formType,
    setModalVisible: values.setModalVisible,
    setParams: values.setParams,
    resetPagination: values.resetPagination
  };
};
