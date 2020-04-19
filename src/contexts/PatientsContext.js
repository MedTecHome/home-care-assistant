import React, { createContext, useContext, useReducer } from 'react';
import { isEmpty } from 'ramda';
import { initialPatientsState, PatientsReducers } from '../components/patients/reducers/PatientsReducers';
import {
  listPatientsFetch,
  saveDataOfPatientFetch,
  setListPatientsAction,
  setSelectedPatientsAction,
} from '../components/patients/reducers/PatientsActions';
import { GlobalReducer, initialGlobalState } from '../commons/reducers/GlobalReducers';
import setModalVisibleAction from '../commons/reducers/GlobalActions';

const PatientsContext = createContext({});

const PatientsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PatientsReducers, initialPatientsState, init => init);
  const [modalState, modalDispatch] = useReducer(GlobalReducer, initialGlobalState, init => init);

  const getListPatients = params => {
    listPatientsFetch(params)
      .then(querySnapshot => {
        let result = [];
        querySnapshot.forEach(doc => {
          result = [...result, { id: doc.id, ...doc.data() }];
        });
        dispatch(setListPatientsAction(result, 0));
      })
      // eslint-disable-next-line no-console
      .catch(console.error);
  };

  const selectPatients = selected => dispatch(setSelectedPatientsAction(selected));

  const savePatientsData = async (data, formType) => {
    try {
      await saveDataOfPatientFetch(data, formType);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  const setModalVisible = (visible, formType) => modalDispatch(setModalVisibleAction(visible, formType));

  return (
    <PatientsContext.Provider
      value={{
        ...state,
        ...modalState,
        setModalVisible,
        getListPatients,
        selectPatients,
        savePatientsData,
      }}
    >
      {children}
    </PatientsContext.Provider>
  );
};

export const usePatientsContext = () => {
  const values = useContext(PatientsContext);
  if (isEmpty(values)) throw new Error('Only works inside PatientsContextProvider');
  return values;
};

export const withPatientsContextProvider = WrapperComponent => () => {
  return (
    <PatientsContextProvider>
      <WrapperComponent />
    </PatientsContextProvider>
  );
};
