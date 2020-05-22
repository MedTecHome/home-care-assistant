import React, { useContext, useState, createContext, useCallback } from 'react';
import { getAllPatientHistoryAction } from '../MedicalForms/reducers/PatienHealthActions';
import { useMessageContext } from '../../MessageHandle/MessageContext';
import { ERROR_MESSAGE } from '../../commons/globalText';
import { getListTreatmentsAction } from '../Treatments/reducers/TreatmentActions';

const EvolutionContext = createContext({});

export const withEvolutionContext = WrapperComponent => ({ children }) => {
  const { RegisterMessage } = useMessageContext();
  const [filters, setFilters] = useState({});
  const [treatments, setTreatmentList] = useState([]);
  const [testList, setTestList] = useState([]);

  const getTestList = useCallback(async () => {
    const { rangeDate, ...rest } = filters;
    try {
      if (rangeDate && rangeDate[0] && rangeDate[1]) {
        const list1 = await getAllPatientHistoryAction({
          limit: 365,
          filters: { ...rest, type: 'all', startDate: rangeDate }
        });
        const list2 = await getAllPatientHistoryAction({
          limit: 365,
          filters: { ...rest, type: 'all', endDate: rangeDate }
        });

        const result = list1.concat(list2).filter(
          (thing, index, self) =>
            index ===
            self.findIndex(t => {
              return t.id === thing.id;
            })
        );
        setTestList(result);
      }
    } catch (e) {
      RegisterMessage(ERROR_MESSAGE, e, 'EvolutionContext-getTestList');
    }
  }, [filters, RegisterMessage]);

  const getTreatmentList = useCallback(async () => {
    const { rangeDate, ...rest } = filters;
    try {
      if (rangeDate) {
        const start = await getListTreatmentsAction({ filters: { ...rest, startDate: rangeDate } });
        const end = await getListTreatmentsAction({ filters: { ...rest, endDate: rangeDate } });
        const treat = start.concat(end).filter(
          (thing, index, self) =>
            index ===
            self.findIndex(t => {
              return t.id === thing.id;
            })
        );
        let medicines = [];
        treat.map(t => {
          const aux = t.medicines.map(m => ({ ...m, startDate: t.startDate, endDate: t.endDate }));
          medicines = [...medicines, ...aux];
          return null;
        });
        const result = medicines.filter(
          (thing, index, self) =>
            index ===
            self.findIndex(t => {
              return t.id === thing.id;
            })
        );
        setTreatmentList(result);
      }
    } catch (e) {
      RegisterMessage(ERROR_MESSAGE, e, 'EvolutionContext-getTestList');
    }
  }, [RegisterMessage, filters]);

  return (
    <EvolutionContext.Provider
      value={{
        getTestList,
        getTreatmentList,
        testList,
        treatments,
        filters,
        setFilters
      }}
    >
      <WrapperComponent>{children}</WrapperComponent>
    </EvolutionContext.Provider>
  );
};

export const useEvolutionContext = () => {
  const values = useContext(EvolutionContext);
  if (!values) throw new Error('this only works inside EvolutionContextProvider.');

  return {
    getTestList: values.getTestList,
    getTreatmentList: values.getTreatmentList,
    testList: values.testList,
    treatments: values.treatments,
    filters: values.filters,
    setFilters: values.setFilters
  };
};
