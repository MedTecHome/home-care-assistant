import React, { useContext, useState, createContext, useCallback } from 'react';
import moment from 'moment';
import { useMessageContext } from '../../MessageHandle/MessageContext';
import { ERROR_MESSAGE } from '../../commons/globalText';
import { getEvolutionClinical, getEvolutionTreatments } from './actions/EvolutionActions';

const EvolutionContext = createContext({});

export const withEvolutionContext = WrapperComponent => ({ children }) => {
  const { RegisterMessage } = useMessageContext();
  const [filters, setFilters] = useState({});
  const [treatments, setTreatmentList] = useState([]);
  const [testList, setTestList] = useState([]);
  const [loadingList, setLoadingList] = useState(false);

  const retriveDateFormDB = useCallback(async () => {
    if (filters.rangeDate && filters.rangeDate[0] && filters.rangeDate[1] && filters['user.id']) {
      setLoadingList(true);
      try {
        const rDate = filters.rangeDate.map(date => moment(date).unix());
        const response1 = await getEvolutionClinical({ ...filters, rangeDate: rDate });
        const response2 = await getEvolutionTreatments({ ...filters, rangeDate: rDate });
        setTestList(response1.data);
        setTreatmentList(response2);
      } catch (e) {
        RegisterMessage(ERROR_MESSAGE, e, 'EvolutionContext-retriveDateFormDB');
      } finally {
        setLoadingList(false);
      }
    }
  }, [filters, RegisterMessage]);

  return (
    <EvolutionContext.Provider
      value={{
        retriveDateFormDB,
        loadingList,
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
    retriveDateFormDB: values.retriveDateFormDB,
    loadingList: values.loadingList,
    testList: values.testList,
    treatments: values.treatments,
    filters: values.filters,
    setFilters: values.setFilters
  };
};
