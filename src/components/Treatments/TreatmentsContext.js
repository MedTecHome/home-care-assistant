import React, { createContext, useCallback, useContext, useMemo, useReducer, useState, useEffect } from 'react';
import { GlobalReducer, initialGlobalState } from '../../commons/actions/GlobalReducers';
import setModalVisibleAction from '../../commons/actions/GlobalActions';
import { saveValuesAction } from './actions/TreatmentActions';
import { useMessageContext } from '../../MessageHandle/MessageContext';
import { ERROR_MESSAGE } from '../../commons/globalText';
import getTreatments from '../../services/treatments';

const TreatmentsContext = createContext({});

export const withTreatmentsContext = WrapperComponent => props => {
  const { RegisterMessage } = useMessageContext();
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [slected, setSelected] = useState(null);
  const [loadingList, setLoadingList] = useState(false);
  const [params, setParmas] = useState({});
  const [globalState, globalDispatch] = useReducer(GlobalReducer, initialGlobalState, init => init);
  const selected = useMemo(() => slected, [slected]);
  const listTreatments = useMemo(() => list, [list]);

  useEffect(() => {
    setLoadingList(true);
    getTreatments(1000, 0, params)
      .then(res => {
        setList(res.data);
        setTotal(res.total);
      })
      .catch(e => RegisterMessage(ERROR_MESSAGE, e, 'TreatmenrsContext-getListOfTreatments'))
      .finally(() => setLoadingList(false));
  }, [params, RegisterMessage]);

  const selectFromList = useCallback(
    id => {
      const result = listTreatments.find(item => item.id === id) || null;
      setSelected(result);
    },
    [listTreatments]
  );

  const saveValues = useCallback(
    async (values, formType) => {
      await saveValuesAction(values, formType).catch(e => RegisterMessage(ERROR_MESSAGE, e, 'TreatmentsContext'));
    },
    [RegisterMessage]
  );

  const setModalVisible = useCallback((flag, formType) => {
    globalDispatch(setModalVisibleAction(flag, formType));
  }, []);

  return (
    <TreatmentsContext.Provider
      value={{
        listTreatments,
        total,
        selected,
        loadingList,
        params,
        ...globalState,
        setTotal,
        selectFromList,
        saveValues,
        setParmas,
        setModalVisible
      }}
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <WrapperComponent {...props} />
    </TreatmentsContext.Provider>
  );
};

export const useTreatmentsContext = () => {
  const values = useContext(TreatmentsContext);
  if (!values) throw new Error('Only works inside TreatmentsContextProvider');

  return {
    listTreatments: values.listTreatments,
    selected: values.selected,
    loadingList: values.loadingList,
    params: values.params,
    formType: values.formType,
    modalVisible: values.modalVisible,
    total: values.total,
    setTotal: values.setTotal,
    getListOfTreatments: values.getListOfTreatments,
    selectFromList: values.selectFromList,
    saveValues: values.saveValues,
    setParmas: values.setParmas,
    setModalVisible: values.setModalVisible
  };
};
