import React, { createContext, useContext, useReducer } from 'react';
import { isEmpty } from 'ramda';
import { initialPatientsState, PatientsReducers } from '../components/patients/reducers/PatientsReducers';
import {
  getRefPatients,
  saveDataOfPatientFetchAction,
  setListLoadingAction,
  setListPatientsAction,
  setSaveLoadingAction,
  setSelectedPatientsAction,
  setTotalPatientsAction,
} from '../components/patients/reducers/PatientsActions';
import { GlobalReducer, initialGlobalState } from '../commons/reducers/GlobalReducers';
import setModalVisibleAction from '../commons/reducers/GlobalActions';
import { saveHospitalValuesAction } from '../components/hospital/reducers/HospitalActions';

const PatientsContext = createContext({});

const PatientsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PatientsReducers, initialPatientsState, init => init);
  const [modalState, modalDispatch] = useReducer(GlobalReducer, initialGlobalState, init => init);

  const getListPatients = ({ limit = 5, next, prev }) => {
    dispatch(setListLoadingAction(true));
    getRefPatients().onSnapshot(doc => dispatch(setTotalPatientsAction(doc.data().total)));
    let ref = getRefPatients().collection('patients');
    if (next) {
      ref = ref.startAfter(next.name).limit(limit);
    } else if (prev) {
      ref = ref.endBefore(prev.name).limitToLast(limit);
    } else {
      ref = ref.limit(limit);
    }
    ref
      .get()
      .then(snapshot => {
        const result = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        dispatch(setListPatientsAction(result));
      })
      // eslint-disable-next-line no-console
      .catch(console.error)
      .finally(() => dispatch(setListLoadingAction(false)));
  };

  const selectPatients = selected => dispatch(setSelectedPatientsAction(selected));

  const savePatientsData = async (data, formType) => {
    dispatch(setSaveLoadingAction(true));
    saveDataOfPatientFetchAction(data, formType)
      // eslint-disable-next-line no-console
      .catch(console.error)
      .finally(() => dispatch(setSaveLoadingAction(false)));
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
