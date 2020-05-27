import React, { useContext, useState, createContext, useEffect } from 'react';
import { useMessageContext } from '../../MessageHandle/MessageContext';
import { ERROR_MESSAGE } from '../../commons/globalText';
import getEvolution from '../../services/evolution';
import { isEmpty } from '../../helpers/utils';

const EvolutionContext = createContext({});

export const withEvolutionContext = WrapperComponent => ({ patient, children }) => {
  const { RegisterMessage } = useMessageContext();
  const [params, setParams] = useState({});
  const [treatments, setTreatmentList] = useState([]);
  const [testList, setTestList] = useState([]);
  const [loadingList, setLoadingList] = useState(false);

  useEffect(() => {
    const { limit, offset, ...filters } = params;
    if (!isEmpty(filters)) {
      setLoadingList(true);
      getEvolution(filters)
        .then(response => {
          setTreatmentList(response.treatments);
          setTestList(response.clinicaltest);
        })
        .catch(e => RegisterMessage(ERROR_MESSAGE, e, 'EvolutionContext-getEvolution'))
        .finally(() => {
          setLoadingList(false);
        });
    }
  }, [params, RegisterMessage]);

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
      <WrapperComponent patient={patient}>{children}</WrapperComponent>
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
    params: values.params,
    setParams: values.setParams
  };
};
