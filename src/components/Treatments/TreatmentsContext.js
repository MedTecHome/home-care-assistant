import React, { createContext, useCallback, useContext, useMemo, useReducer, useState, useEffect, useRef } from 'react';
import { GlobalReducer, initialGlobalState } from '../../commons/actions/GlobalReducers';
import setModalVisibleAction from '../../commons/actions/GlobalActions';
import saveValuesAction from './actions/TreatmentActions';
import { useMessageContext } from '../../MessageHandle/MessageContext';
import { ERROR_MESSAGE } from '../../commons/globalText';
import getTreatments from '../../services/treatments';
import { isEmpty } from '../../helpers/utils';
import getNomenclator from '../../services/nomenclators';
import { getMedicineById } from '../../services/medicines';

const TreatmentsContext = createContext({});

export const withTreatmentsContext = WrapperComponent => props => {
  const { RegisterMessage } = useMessageContext();
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [slected, setSelected] = useState(null);
  const [loadingList, setLoadingList] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [prms, setPrms] = useState({});
  const [globalState, globalDispatch] = useReducer(GlobalReducer, initialGlobalState, init => init);
  const selected = useMemo(() => slected, [slected]);
  const listTreatments = useMemo(() => list, [list]);
  const mounted = useRef(true);

  const setParams = useCallback(values => {
    setPrms(values);
  }, []);

  const params = useMemo(() => prms, [prms]);

  useEffect(() => {
    const { limit, offset, ...filters } = params;
    if (!loadingSave && !isEmpty(filters)) {
      setLoadingList(true);
      getTreatments(limit, offset, filters)
        .then(res => {
          const treatments = res.data.map(async treat => {
            const medicines = await getMedicineById(treat.medicines);
            let result = { ...medicines, ...JSON.parse(treat.medicineSetting) };
            if (result.administrationType) {
              const administrationTypeObj = await getNomenclator('administrationroute', result.administrationType);
              result = { ...result, administrationTypeObj };
            }
            if (result.doseType) {
              const doseTypeObj = await getNomenclator('dosis', result.doseType);
              result = { ...result, doseTypeObj };
            }
            if (result.concentrationType) {
              const concentrationTypeObj = await getNomenclator('concentrations', result.concentrationType);
              result = { ...result, concentrationTypeObj };
            }
            return { ...treat, medicineObject: result };
          });
          Promise.all(treatments)
            .then(data => {
              if (mounted.current === true) {
                setList(data);
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
        .catch(e => RegisterMessage(ERROR_MESSAGE, e, 'TreatmenrsContext-getListOfTreatments'));
    }
    return () => {
      mounted.current = false;
    };
  }, [loadingSave, params, RegisterMessage]);

  const selectFromList = useCallback(
    id => {
      const result = listTreatments.find(item => item.id === id) || null;
      setSelected(result);
    },
    [listTreatments]
  );

  const saveValues = useCallback(
    async (values, formType) => {
      setLoadingSave(true);
      try {
        await saveValuesAction(values, formType);
      } catch (e) {
        RegisterMessage(ERROR_MESSAGE, e, 'TreatmentsContext');
      } finally {
        setLoadingSave(false);
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
        listTreatments,
        total,
        selected,
        loadingList,
        params,
        ...globalState,
        setTotal,
        selectFromList,
        saveValues,
        setParams,
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
    setParams: values.setParams,
    setModalVisible: values.setModalVisible
  };
};
