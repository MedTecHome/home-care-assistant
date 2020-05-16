import React, { createContext, useCallback, useContext, useMemo, useReducer, useState } from 'react';
import { GlobalReducer, initialGlobalState } from '../../commons/reducers/GlobalReducers';
import setModalVisibleAction from '../../commons/reducers/GlobalActions';
import { getMedicinesListAction, saveMedicineValuesActions } from './reducers/MedicinesActions';
import { useMessageContext } from '../../MessageHandle/MessageContext';
import { ERROR_MESSAGE } from '../../commons/globalText';

const MedicinesContext = createContext({});

export const withMedicinesContext = WrapperComponent => props => {
  const { RegisterMessage } = useMessageContext();
  const [medicList, setMedicinesList] = useState([]);
  const [loadList, setLoadingList] = useState(false);
  const [seletd, setSelected] = useState(null);
  const [filters, setFilters] = useState({});
  const [globalState, globalDispath] = useReducer(GlobalReducer, initialGlobalState, init => init);

  const medicineList = useMemo(() => medicList, [medicList]);
  const loadingList = useMemo(() => loadList, [loadList]);
  const selected = useMemo(() => seletd, [seletd]);

  const getMedicinesList = useCallback(
    async params => {
      setLoadingList(true);
      try {
        const result = await getMedicinesListAction(params);
        setMedicinesList(result);
      } catch (e) {
        RegisterMessage(ERROR_MESSAGE, e);
      }
      setLoadingList(false);
    },
    [RegisterMessage]
  );

  const saveMedicineValues = useCallback(
    async (values, formType) => {
      await saveMedicineValuesActions(values, formType).catch(e => RegisterMessage(ERROR_MESSAGE, e));
    },
    [RegisterMessage]
  );

  const selectMedicineFromList = useCallback(
    id => {
      const medicine = medicineList.find(item => item.id === id) || null;
      setSelected(medicine);
    },
    [medicineList]
  );

  const setModalVisible = useCallback((flag, formType) => {
    globalDispath(setModalVisibleAction(flag, formType));
  }, []);

  return (
    <MedicinesContext.Provider
      value={{
        medicineList,
        loadingList,
        selected,
        filters,
        ...globalState,
        getMedicinesList,
        selectMedicineFromList,
        saveMedicineValues,
        setModalVisible,
        setFilters
      }}
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <WrapperComponent {...props} />
    </MedicinesContext.Provider>
  );
};

export const useMedicinesContext = () => {
  const values = useContext(MedicinesContext);
  if (!values) throw new Error('this hooks only works inside MedicinesContextProvider ');

  return {
    medicineList: values.medicineList,
    loadingList: values.loadingList,
    selected: values.selected,
    filters: values.filters,
    formType: values.formType,
    modalVisible: values.modalVisible,
    getMedicinesList: values.getMedicinesList,
    selectMedicineFromList: values.selectMedicineFromList,
    saveMedicineValues: values.saveMedicineValues,
    setModalVisible: values.setModalVisible,
    setFilters: values.setFilters
  };
};
