import React, { createContext, useCallback, useContext, useReducer } from 'react';
import { isEmpty } from 'ramda';
import { initialPatientsState, PatientsReducers } from '../components/patients/reducers/PatientsReducers';
import {
  saveDataOfPatientFetchAction,
  setListPatientsLoadingAction,
  setListPatientsAction,
  setSavePatientLoadingAction,
  setSelectedPatientsAction,
  setTotalPatientsAction,
} from '../components/patients/reducers/PatientsActions';
import { GlobalReducer, initialGlobalState } from '../commons/reducers/GlobalReducers';
import { setModalVisibleAction } from '../commons/reducers/GlobalActions';
import { dbFirebase } from '../firebaseConfig';

const PatientsContext = createContext({});

const PatientsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PatientsReducers, initialPatientsState, init => init);
  const [modalState, modalDispatch] = useReducer(GlobalReducer, initialGlobalState, init => init);

  const getListPatients = useCallback(({ limit = 5, next, prev }) => {
    dispatch(setListPatientsLoadingAction(true));
    dbFirebase
      .collection('home-care-assistant')
      .doc('patient')
      .onSnapshot(doc => dispatch(setTotalPatientsAction(doc.data().total)));
    let ref = dbFirebase.collection('home-care-assistant').doc('patient').collection('patients').orderBy('name');
    if (next) {
      ref = ref.startAfter(next.name).limit(limit);
    } else if (prev) {
      ref = ref.endBefore(prev.name).limitToLast(limit);
    } else {
      ref = ref.limit(limit);
    }
    ref.onSnapshot(snapshot => {
      const result = snapshot.docChanges().map(({ doc }) => ({ id: doc.id, ...doc.data() }));
      dispatch(setListPatientsAction(result));
      dispatch(setListPatientsLoadingAction(false));
    });
  }, []);

  const selectPatients = useCallback(selected => {
    dispatch(setSelectedPatientsAction(selected));
  }, []);

  const savePatientsData = useCallback((data, formType) => {
    dispatch(setSavePatientLoadingAction(true));
    saveDataOfPatientFetchAction(data, formType)
      // eslint-disable-next-line no-console
      .catch(console.error)
      .finally(() => dispatch(setSavePatientLoadingAction(false)));
  }, []);

  const setModalVisible = useCallback((visible, formType) => {
    modalDispatch(setModalVisibleAction(visible, formType));
  }, []);

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
  return {
    patients: values.patients,
    listLoading: values.listLoading,
    saveLoading: values.saveLoading,
    total: values.total,
    patientSelected: values.patientSelected,
    formType: values.formType,
    modalVisible: values.modalVisible,
    setModalVisible: values.setModalVisible,
    getListPatients: values.getListPatients,
    selectPatients: values.selectPatients,
    savePatientsData: values.savePatientsData,
  };
};

export const withPatientsContextProvider = WrapperComponent => props => {
  return (
    <PatientsContextProvider>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <WrapperComponent {...props} />
    </PatientsContextProvider>
  );
};
