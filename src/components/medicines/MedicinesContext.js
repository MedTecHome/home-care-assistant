import React, { createContext, useCallback, useContext, useMemo, useReducer, useState } from 'react';
import { GlobalReducer, initialGlobalState } from '../../commons/reducers/GlobalReducers';
import setModalVisibleAction from '../../commons/reducers/GlobalActions';
import { getMedicinesListAction, saveMedicineValuesActions } from './reducers/MedicinesActions';

const MedicinesContext = createContext({});

export const withMedicinesContext = WrapperComponent => props => {
  const [medicList, setMedicinesList] = useState([]);
  const [loadList, setLoadingList] = useState(false);
  const [seletd, setSelected] = useState(null);
  const [globalState, globalDispath] = useReducer(GlobalReducer, initialGlobalState, init => init);

  const medicineList = useMemo(() => medicList, [medicList]);
  const loadingList = useMemo(() => loadList, [loadList]);
  const selected = useMemo(() => seletd, [seletd]);

  const getMedicinesList = useCallback(async params => {
    setLoadingList(true);
    try {
      const result = await getMedicinesListAction(params);
      setMedicinesList(result);
    } catch (e) {
      // handle errror
    }
    setLoadingList(false);
  }, []);

  const saveMedicineValues = useCallback(async (values, formType) => {
    await saveMedicineValuesActions(values, formType);
  }, []);

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
        ...globalState,
        getMedicinesList,
        selectMedicineFromList,
        saveMedicineValues,
        setModalVisible,
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
    formType: values.formType,
    modalVisible: values.modalVisible,
    getMedicinesList: values.getMedicinesList,
    selectMedicineFromList: values.selectMedicineFromList,
    saveMedicineValues: values.saveMedicineValues,
    setModalVisible: values.setModalVisible,
  };
};