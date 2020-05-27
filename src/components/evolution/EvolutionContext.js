import React, { useContext, useState, createContext, useEffect } from 'react';
import moment from 'moment';
import { useMessageContext } from '../../MessageHandle/MessageContext';
import { ERROR_MESSAGE } from '../../commons/globalText';
import { getEvolutionClinical, getEvolutionTreatments } from './actions/EvolutionActions';

const EvolutionContext = createContext({});

export const withEvolutionContext = WrapperComponent => ({ patient, children }) => {
  const { RegisterMessage } = useMessageContext();
  const [params, setParams] = useState({});
  const [treatments, setTreatmentList] = useState([]);
  const [testList, setTestList] = useState([]);
  const [loadingList, setLoadingList] = useState(false);

  useEffect(() => {
    if (params.rangeDate && params.rangeDate[0] && params.rangeDate[1] && params['user.id']) {
      setLoadingList(true);
      const rDate = params.rangeDate.map(date => moment(date).unix());
      getEvolutionClinical({ ...params, rangeDate: rDate })
        .then(response1 => {
          getEvolutionTreatments({ ...params, rangeDate: rDate })
            .then(response2 => {
              setTestList(response1.data);
              setTreatmentList(response2);
            })
            .catch(e => e);
        })
        .catch(e => {
          RegisterMessage(ERROR_MESSAGE, e, 'EvolutionContext-retriveDateFormDB');
        })
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
