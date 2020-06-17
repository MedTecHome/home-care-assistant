import React, { createContext, useContext, useReducer, useState, useEffect, useRef, useCallback } from 'react';
import { GlobalReducer, initialGlobalState } from '../../commons/actions/GlobalReducers';
import { isEmpty } from '../../helpers/utils';
import { useCustomPaginationContext } from '../pagination/PaginationContext';
import getMedicines, { addMedicine, editMedicine, deleteMedicine } from '../../services/medicines';
import setModalVisibleAction from '../../commons/actions/GlobalActions';
import { ADD_FORM_TEXT, EDIT_FORM_TEXT, DELETE_FORM_TEXT } from '../../commons/globalText';

const MedicinesContext = createContext({});

export const MedicinesContextProvider = ({ children }) => {
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [loadingList, setLoadingList] = useState(false);
  const [selected, setSelected] = useState(null);
  const [action, setAction] = useState('fetch');
  const [clinicFilter, setClinicFilter] = useState(null);
  const [nameFilter, setNameFilter] = useState('');
  const { page, pageSize, resetPagination } = useCustomPaginationContext();
  const [globalState, globalDispatch] = useReducer(GlobalReducer, initialGlobalState, init => init);
  const mounted = useRef(true);

  const fetchList = useCallback(async (limit, pag, filters) => {
    setLoadingList(true);
    const result = await getMedicines(limit, pag, filters);
    if (mounted.current) {
      setList(result.data);
      setTotal(result.total);
    }
    setLoadingList(false);
  }, []);

  useEffect(() => {
    mounted.current = true;
    if (!isEmpty(clinicFilter)) {
      fetchList(pageSize, page, { clinic: clinicFilter, name: nameFilter });
      setAction('');
    }

    return () => {
      mounted.current = false;
    };
  }, [pageSize, page, clinicFilter, nameFilter, fetchList, action, setAction]);

  const setSelectedFromList = useCallback(
    id => {
      const element = list.find(a => a.id === id) || null;
      setSelected(element);
    },
    [list]
  );

  const saveValues = useCallback(async (values, formType) => {
    try {
      switch (formType) {
        case ADD_FORM_TEXT: {
          await addMedicine(values);
          break;
        }
        case EDIT_FORM_TEXT: {
          await editMedicine(values);
          break;
        }
        case DELETE_FORM_TEXT: {
          await deleteMedicine(values);
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
    <MedicinesContext.Provider
      value={{
        list,
        total,
        clinicFilter,
        nameFilter,
        selected,
        setSelectedFromList,
        resetPagination,
        loadingList,
        ...globalState,
        saveValues,
        setModalVisible,
        setNameFilter,
        setClinicFilter
      }}
    >
      {children}
    </MedicinesContext.Provider>
  );
};

export const useMedicinesContext = () => {
  const values = useContext(MedicinesContext);
  return {
    list: values.list,
    total: values.total,
    clinicFilter: values.clinicFilter,
    nameFilter: values.nameFilter,
    selected: values.selected,
    setSelectedFromList: values.setSelectedFromList,
    resetPagination: values.resetPagination,
    loadingList: values.loadingList,
    formType: values.formType,
    modalVisible: values.modalVisible,
    setModalVisible: values.setModalVisible,
    saveValues: values.saveValues,
    setClinicFilter: values.setClinicFilter,
    setNameFilter: values.setNameFilter
  };
};
