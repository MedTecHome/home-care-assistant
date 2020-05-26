import React, { createContext, useCallback, useContext, useMemo, useReducer, useState, useEffect } from 'react';
import { saveHospitalValuesAction } from './actions/HospitalActions';
import setModalVisibleAction from '../../commons/actions/GlobalActions';
import { GlobalReducer, initialGlobalState } from '../../commons/actions/GlobalReducers';
import { useMessageContext } from '../../MessageHandle/MessageContext';
import { ERROR_MESSAGE } from '../../commons/globalText';
import getHospitals from '../../services/hospital';

const HospitalContext = createContext({});

const HospitalContextProvider = ({ children }) => {
  const { RegisterMessage } = useMessageContext();
  const [hospitals, setHospitals] = useState([]);
  const [total, setTotal] = useState(0);
  const [loadingList, setLoadingList] = useState(false);
  const [slected, setSelected] = useState(null);
  const [params, setParams] = useState({});
  const [globalState, globalDispatch] = useReducer(GlobalReducer, initialGlobalState, init => init);

  const hospitalsList = useMemo(() => hospitals, [hospitals]);
  const selected = useMemo(() => slected, [slected]);

  // eslint-disable-next-line no-unused-vars
  useEffect(() => {
    if (globalState.formType === null) {
      const { limit, offset, ...filters } = params;
      setLoadingList(true);
      getHospitals(limit, offset, filters)
        .then(result => {
          setHospitals(result.data);
          setTotal(result.total);
        })
        .catch(e => {
          RegisterMessage(ERROR_MESSAGE, e, 'HospitalContext');
        })
        .finally(() => {
          setLoadingList(false);
        });
    }
  }, [params, globalState.formType, RegisterMessage]);

  const selectHospital = useCallback(
    id => {
      const result = hospitalsList.find(item => item.id === id) || null;
      setSelected(result);
    },
    [hospitalsList]
  );

  const saveHospitalValues = useCallback(
    async (values, formType) => {
      await saveHospitalValuesAction(values, formType).catch(e => RegisterMessage(ERROR_MESSAGE, e, 'HospitalContext'));
    },
    [RegisterMessage]
  );

  const setModalVisible = useCallback((visible, formType) => {
    globalDispatch(setModalVisibleAction(visible, formType));
  }, []);

  return (
    <HospitalContext.Provider
      value={{
        hospitalsList,
        loadingList,
        selected,
        params,
        ...globalState,
        selectHospital,
        saveHospitalValues,
        setModalVisible,
        setParams,
        total,
        setTotal
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospitalContext = () => {
  const values = useContext(HospitalContext);
  if (!values) throw new Error('This hooks only works inside HospitalContextProvider');
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
    setParams: values.setParams,
    total: values.total
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
