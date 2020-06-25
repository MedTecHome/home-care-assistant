import React, { createContext, useCallback, useContext, useReducer, useState, useRef, useEffect } from 'react';
import { GlobalReducer, initialGlobalState } from '../../commons/actions/GlobalReducers';
import setModalVisibleAction from '../../commons/actions/GlobalActions';
import { useMessageContext } from '../../MessageHandle/MessageContext';
import { ERROR_MESSAGE } from '../../commons/globalText';
import getClinicalTests from '../../services/clinicaltest';

const PatientHistoryContext = createContext({});

const PatientHistoryContextProvider = ({ children }) => {
  const { RegisterMessage } = useMessageContext();
  const [historyList, setHistoryList] = useState([]);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState(null);
  const [testFilter, setTestFilter] = useState('');
  const [rangeDate, setRangeDate] = useState([null, null]);
  const [loadingList, setLoadingList] = useState(false);
  const [modalState, modalDispath] = useReducer(GlobalReducer, initialGlobalState, init => init);
  const mounted = useRef(true);

  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  const fetchList = useCallback(
    async (limit, pag, user, rDate, type) => {
      mounted.current = true;
      if (user && rDate[0] && rDate[1]) {
        setLoadingList(true);
        try {
          const result = await getClinicalTests(limit, pag, { user, rangeDate: rDate }, type);
          if (mounted.current === true) {
            setHistoryList(result.data);
            setTotal(result.total);
          }
        } catch (e) {
          RegisterMessage(ERROR_MESSAGE, e, 'PatienhistoryCOmponent');
        } finally {
          if (mounted.current === true) setLoadingList(false);
        }
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
        testFilter,
        rangeDate,
        total,
        ...modalState,
        selectMedicalForm,
        setTestFilter,
        setRangeDate,
        setModalVisible,
        fetchList
      }}
    >
      {children}
    </PatientHistoryContext.Provider>
  );
};

export const withPatientHistoryContext = WrapperComponent => ({ defaultTest, patient, fromDoctor, children }) => {
  return (
    <PatientHistoryContextProvider>
      <WrapperComponent fromDoctor={fromDoctor} defaultTest={defaultTest} patient={patient}>
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
    testFilter: values.testFilter,
    rangeDate: values.rangeDate,
    modalVisible: values.modalVisible,
    selected: values.selected,
    total: values.total,
    selectMedicalForm: values.selectMedicalForm,
    formType: values.formType,
    setModalVisible: values.setModalVisible,
    setTestFilter: values.setTestFilter,
    setRangeDate: values.setRangeDate,
    fetchList: values.fetchList
  };
};
