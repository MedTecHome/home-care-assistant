import React, { createContext, useCallback, useContext, useReducer, useState, useEffect, useRef } from 'react';
import { GlobalReducer, initialGlobalState } from '../../commons/actions/GlobalReducers';
import setModalVisibleAction from '../../commons/actions/GlobalActions';
import { ADD_FORM_TEXT, EDIT_FORM_TEXT, DELETE_FORM_TEXT } from '../../commons/globalText';
import getTreatments, { addTreatment, editTreatment, deleteTreatment } from '../../services/treatments';
import { isEmpty } from '../../helpers/utils';
import { useCustomPaginationContext } from '../pagination/PaginationContext';

const TreatmentsContext = createContext({});

export const withTreatmentsContext = WrapperComponent => props => {
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState(null);
  const [loadingList, setLoadingList] = useState(false);
  const [action, setAction] = useState('');
  const [userFilter, setUserFilter] = useState(null);
  const [globalState, globalDispatch] = useReducer(GlobalReducer, initialGlobalState, init => init);
  const { pageSize, page, resetPagination } = useCustomPaginationContext();
  const mounted = useRef(true);

  const fetchList = useCallback(async (limit, pag, filters) => {
    try {
      const result = await getTreatments(limit, pag, filters);
      if (mounted.current) {
        setList(result.data);
        setTotal(result.total);
        setAction('');
      }
    } catch (e) {
      throw new Error(e.message);
    } finally {
      if (mounted.current) setLoadingList(false);
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    if (!isEmpty(userFilter)) {
      setLoadingList(true);
      fetchList(pageSize, page, { user: userFilter });
    }

    return () => {
      mounted.current = false;
    };
  }, [userFilter, action, pageSize, page, fetchList]);

  const selectFromList = useCallback(
    id => {
      const result = list.find(item => item.id === id) || null;
      setSelected(result);
    },
    [list]
  );

  const saveValues = useCallback(async (values, formType) => {
    try {
      switch (formType) {
        case ADD_FORM_TEXT: {
          await addTreatment(values);
          break;
        }
        case EDIT_FORM_TEXT: {
          await editTreatment(values);
          break;
        }
        case DELETE_FORM_TEXT: {
          await deleteTreatment(values);
          break;
        }
        default:
          break;
      }
      setAction('fetch');
    } catch (e) {
      throw new Error(e.message);
    }
  }, []);

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
        userFilter,
        ...globalState,
        setTotal,
        selectFromList,
        saveValues,
        setUserFilter,
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
    userFilter: values.userFilter,
    formType: values.formType,
    modalVisible: values.modalVisible,
    total: values.total,
    selectFromList: values.selectFromList,
    saveValues: values.saveValues,
    setUserFilter: values.setUserFilter,
    setModalVisible: values.setModalVisible,
    resetPagination: values.resetPagination
  };
};
