import React, { useContext, useState, createContext, useEffect, useRef } from 'react';
import { useMessageContext } from '../../MessageHandle/MessageContext';
import { ERROR_MESSAGE } from '../../commons/globalText';
import getEvolution from '../../services/evolution';
import { isEmpty } from '../../helpers/utils';

const EvolutionContext = createContext({});

export const withEvolutionContext = WrapperComponent => ({ setTab, patient, children }) => {
  const { RegisterMessage } = useMessageContext();
  const [params, setParams] = useState({});
  const [treatments, setTreatmentList] = useState([]);
  const [testList, setTestList] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    const { limit, offset, ...filters } = params;
    if (!isEmpty(filters)) {
      setLoadingList(true);
      getEvolution(filters)
        .then(response => {
          if (mounted.current === true) {
            setTreatmentList(response.treatments);
            setTestList(response.clinicaltest);
          }
        })
        .catch(e => RegisterMessage(ERROR_MESSAGE, e, 'EvolutionContext-getEvolution'))
        .finally(() => {
          if (mounted.current === true) setLoadingList(false);
        });
    }

    return () => {
      mounted.current = false;
    };
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
      <WrapperComponent setTab={setTab} patient={patient}>
        {children}
      </WrapperComponent>
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
