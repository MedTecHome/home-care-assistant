import React, { createContext, useCallback, useContext, useReducer, useState, useEffect, useRef } from 'react';
import { GlobalReducer, initialGlobalState } from '../../commons/actions/GlobalReducers';
import setModalVisibleAction from '../../commons/actions/GlobalActions';
import saveValuesAction from './actions/TreatmentActions';
import { useMessageContext } from '../../MessageHandle/MessageContext';
import { ERROR_MESSAGE } from '../../commons/globalText';
import getTreatments from '../../services/treatments';
import { isEmpty } from '../../helpers/utils';
import { useCustomPaginationContext } from '../pagination/PaginationContext';

const TreatmentsContext = createContext({});

export const withTreatmentsContext = WrapperComponent => props => {
  const { RegisterMessage } = useMessageContext();
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState(null);
  const [loadingList, setLoadingList] = useState(false);
  const [action, setAction] = useState('');
  const [params, setParams] = useState({});
  const [globalState, globalDispatch] = useReducer(GlobalReducer, initialGlobalState, init => init);
  const { pageSize, page, resetPagination } = useCustomPaginationContext();
  const mounted = useRef(true);

  const fetchList = useCallback(async (limit, pag, filters) => {
    const result = await getTreatments(limit, pag, filters);
    if (mounted.current) {
      setList(result.data);
      setTotal(result.total);
      setLoadingList(false);
      setAction('');
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    if (!isEmpty(params)) {
      setLoadingList(true);
      fetchList(pageSize, page, params);
    }

    return () => {
      mounted.current = false;
    };
  }, [params, action, pageSize, page, fetchList]);

  const selectFromList = useCallback(
    id => {
      const result = list.find(item => item.id === id) || null;
      setSelected(result);
    },
    [list]
  );

  const saveValues = useCallback(
    async (values, formType) => {
      try {
        await saveValuesAction(values, formType);
      } catch (e) {
        RegisterMessage(ERROR_MESSAGE, e, 'TreatmentsContext');
      } finally {
        setAction('fetch');
      }
    },
    [RegisterMessage]
  );

  const setModalVisible = useCallback((flag, formType) => {
    globalDispatch(setModalVisibleAction(flag, formType));
  }, []);

  return (
    <TreatmentsContext.Provider
      value={{
        list,
        total,
        selected,
        loadingList,
        params,
        ...globalState,
        setTotal,
        selectFromList,
        saveValues,
        setParams,
        setModalVisible,
        resetPagination
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
    list: values.list,
    selected: values.selected,
    loadingList: values.loadingList,
    params: values.params,
    formType: values.formType,
    modalVisible: values.modalVisible,
    total: values.total,
    selectFromList: values.selectFromList,
    saveValues: values.saveValues,
    setParams: values.setParams,
    setModalVisible: values.setModalVisible,
    resetPagination: values.resetPagination
  };
};
