import React, { useContext, useState, createContext, useEffect, useRef, useCallback } from 'react';
import getEvolution from '../../services/evolution';
import { isEmpty } from '../../helpers/utils';

const EvolutionContext = createContext({});

export const withEvolutionContext = WrapperComponent => ({ fromDoctor, setTab, patient, children }) => {
  const [params, setParams] = useState({});
  const [treatments, setTreatmentList] = useState([]);
  const [testList, setTestList] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const mounted = useRef(true);

  const fetchList = useCallback(async filters => {
    setLoadingList(true);
    const response = await getEvolution(filters);
    if (mounted.current === true) {
      setTreatmentList(response.treatments);
      setTestList(response.clinicaltest);
      setLoadingList(false);
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    if (!isEmpty(params) && params.user) {
      const { rangeDate, ...filters } = params;
      if (rangeDate) {
        fetchList({ ...filters, rangeDate: rangeDate.map(i => i.unix()) });
      }
    }
    return () => {
      mounted.current = false;
    };
  }, [params, fetchList]);

  return (
    <EvolutionContext.Provider
      value={{
        loadingList,
        testList,
        treatments,
        params,
        setParams
      }}
    >
      <WrapperComponent setTab={setTab} patient={patient} fromDoctor={fromDoctor}>
        {children}
      </WrapperComponent>
    </EvolutionContext.Provider>
  );
};

export const useEvolutionContext = () => {
  const values = useContext(EvolutionContext);
  if (!values) throw new Error('this only works inside EvolutionContextProvider.');

  return {
    loadingList: values.loadingList,
    testList: values.testList,
    treatments: values.treatments,
    params: values.params,
    setParams: values.setParams
  };
};
