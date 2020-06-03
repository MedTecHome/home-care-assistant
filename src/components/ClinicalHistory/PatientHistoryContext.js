import React, { createContext, useCallback, useContext, useMemo, useReducer, useState, useEffect } from 'react';
import { GlobalReducer, initialGlobalState } from '../../commons/actions/GlobalReducers';
import setModalVisibleAction from '../../commons/actions/GlobalActions';
import { useMessageContext } from '../../MessageHandle/MessageContext';
import { ERROR_MESSAGE } from '../../commons/globalText';
import {
  getClinicalTests,
  getPressure,
  getTemperature,
  getWeight,
  getGlucose,
  getINR,
  getOxygen,
  getExercises,
  getBreathing,
  getOthers,
  getHeartrate
} from '../../services/clinicaltest';
import { useCustomPaginationContext } from '../pagination/PaginationContext';

const PatientHistoryContext = createContext({});

const PatientHistoryContextProvider = ({ children }) => {
  const { RegisterMessage } = useMessageContext();
  const [list, setHistoryList] = useState([]);
  const [total, setTotal] = useState(0);
  const [slcted, setSelected] = useState(null);
  const [prms, setParams] = useState({});
  const { pageSize, offset } = useCustomPaginationContext();
  const [loadingList, setLoadingList] = useState(false);
  const [modalState, modalDispath] = useReducer(GlobalReducer, initialGlobalState, init => init);

  const params = useMemo(() => prms, [prms]);

  const historyList = useMemo(() => list, [list]);
  const selected = useMemo(() => slcted, [slcted]);

  useEffect(() => {
    setLoadingList(true);
    const { type, user = 'none', ...filters } = params;
    if (user) {
      const clinicaltest =
        ((type === 'recently' || !type) && getClinicalTests) ||
        (type === 'pressure' && getPressure) ||
        (type === 'heartrate' && getHeartrate) ||
        (type === 'temperature' && getTemperature) ||
        (type === 'weight' && getWeight) ||
        (type === 'glucose' && getGlucose) ||
        (type === 'breathing' && getBreathing) ||
        (type === 'inr' && getINR) ||
        (type === 'oxygen' && getOxygen) ||
        (type === 'exercises' && getExercises) ||
        (type === 'others' && getOthers);

      clinicaltest(pageSize, offset, { user, ...filters })
        .then(response => {
          const result = response.data.sort((a, b) => {
            const c = a.clinicalDate;
            const d = b.clinicalDate;
            return d - c;
          });
          setHistoryList(result);
          setTotal(response.total);
        })
        .catch(e => {
          RegisterMessage(ERROR_MESSAGE, e, 'PatientHistoryContext');
        })
        .finally(() => {
          setLoadingList(false);
        });
    }
  }, [params, pageSize, offset, RegisterMessage]);

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
        setTotal
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
    getPatientHistory: values.getPatientHistory,
    setModalVisible: values.setModalVisible,
    setParams: values.setParams,
    setTotal: values.setTotal
  };
};
