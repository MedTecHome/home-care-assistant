import React, { createContext, useCallback, useContext, useMemo, useReducer, useState, useEffect, useRef } from 'react';
import { GlobalReducer, initialGlobalState } from '../../commons/actions/GlobalReducers';
import setModalVisibleAction from '../../commons/actions/GlobalActions';
import { saveMedicineValuesActions } from './actions/MedicinesActions';
import { useMessageContext } from '../../MessageHandle/MessageContext';
import { ERROR_MESSAGE } from '../../commons/globalText';
import getMedicines from '../../services/medicines';
import { isEmpty } from '../../helpers/utils';
import { useCustomPaginationContext } from '../pagination/PaginationContext';
import getNomenclator from '../../services/nomenclators';

const MedicinesContext = createContext({});

export const withMedicinesContext = WrapperComponent => props => {
  const { RegisterMessage } = useMessageContext();
  const { pageSize: limit, offset, resetPagination } = useCustomPaginationContext();
  const [medicList, setMedicinesList] = useState([]);
  const [total, setTotal] = useState(0);
  const [loadingList, setLoadingList] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [seletd, setSelected] = useState(null);
  const [params, setParams] = useState({});
  const [globalState, globalDispath] = useReducer(GlobalReducer, initialGlobalState, init => init);
  const mounted = useRef(true);

  const medicineList = useMemo(() => medicList, [medicList]);
  const selected = useMemo(() => seletd, [seletd]);

  useEffect(() => {
    mounted.current = true;
    if (!loadingSave && !isEmpty(params)) {
      setLoadingList(true);
      getMedicines(limit, offset, params)
        .then(res => {
          const medicines = res.data.map(async medicine => {
            const administrationTypeObj = await getNomenclator('administrationroute', medicine.administrationType);
            const concentrationObj = await getNomenclator('concentrations', medicine.concentrationType);
            const doseTypeObj = await getNomenclator('dosis', medicine.doseType);
            return { ...medicine, administrationTypeObj, doseTypeObj, concentrationObj };
          });
          Promise.all(medicines)
            .then(data => {
              if (mounted.current === true) {
                setMedicinesList(data);
                setTotal(res.total);
              }
            })
            .catch(e => {
              throw new Error(e);
            })
            .finally(() => {
              if (mounted.current === true) setLoadingList(false);
            });
        })
        .catch(e => RegisterMessage(ERROR_MESSAGE, e, 'MedicinesContext-getMedicinesTotal'));
    }
    return () => {
      mounted.current = false;
    };
  }, [params, limit, offset, loadingSave, RegisterMessage]);

  const saveMedicineValues = useCallback(
    async (values, formType) => {
      setLoadingSave(true);
      try {
        await saveMedicineValuesActions(values, formType);
      } catch (e) {
        RegisterMessage(ERROR_MESSAGE, e, 'MedicinesContext');
      } finally {
        setLoadingSave(false);
      }
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
        params,
        total,
        setTotal,
        ...globalState,
        selectMedicineFromList,
        saveMedicineValues,
        setModalVisible,
        setParams,
        resetPagination
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
    params: values.params,
    total: values.total,
    formType: values.formType,
    modalVisible: values.modalVisible,
    selectMedicineFromList: values.selectMedicineFromList,
    saveMedicineValues: values.saveMedicineValues,
    setModalVisible: values.setModalVisible,
    setParams: values.setParams,
    resetPagination: values.resetPagination
  };
};
