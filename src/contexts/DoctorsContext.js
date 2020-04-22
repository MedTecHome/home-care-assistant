import React, { createContext, useCallback, useContext, useReducer } from 'react';
import { isEmpty, isNil } from 'ramda';
import { DoctorsReducer, initialDoctorsState } from '../components/doctors/reducers/DoctorsReducers';
import {
  getRefDoctorsAction,
  saveDoctorValuesAction,
  setListDoctorsAction,
  setListHospitalOnDoctorsAction,
  setListLoadingDoctorsAction,
  setSaveLoadingDoctorsAction,
  setSelectedDoctorAction,
  setTotalDoctorsAction,
} from '../components/doctors/reducers/DoctorsActions';
import { GlobalReducer, initialGlobalState } from '../commons/reducers/GlobalReducers';
import { setModalVisibleAction } from '../commons/reducers/GlobalActions';
import { getHospitalDetailsAction } from '../components/hospital/reducers/HospitalActions';

const DoctorsContext = createContext({});

const DoctorsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DoctorsReducer, initialDoctorsState, init => init);
  const [globalState, globalDispatch] = useReducer(GlobalReducer, initialGlobalState, init => init);

  const getListDoctors = useCallback(({ limit = 5, next, prev }) => {
    dispatch(setListLoadingDoctorsAction(true));
    let ref = getRefDoctorsAction();
    ref.onSnapshot(snapshot => {
      dispatch(setTotalDoctorsAction(snapshot.data().total));
    });

    ref = ref.collection('doctors').orderBy('name');
    if (next) {
      ref = ref.startAfter(next).limit(limit);
    } else if (prev) {
      ref = ref.endBefore(prev).limitToLast(limit);
    } else {
      ref = ref.limit(limit);
    }

    ref.onSnapshot(snapshot => {
      const result = snapshot.docChanges().map(({ doc }) => {
        if (doc.data().hospitalId) {
          getHospitalDetailsAction(doc.data().hospitalId).onSnapshot(h => {
            dispatch(setListHospitalOnDoctorsAction({ id: h.id, ...h.data() }));
          });
        }
        return { id: doc.id, ...doc.data() };
      });
      dispatch(setListDoctorsAction(result));
      dispatch(setListLoadingDoctorsAction(false));
    });
  }, []);

  const selectDoctor = useCallback(selected => {
    dispatch(setSelectedDoctorAction(selected));
  }, []);

  const saveDoctorValues = useCallback((values, formType) => {
    dispatch(setSaveLoadingDoctorsAction(true));
    saveDoctorValuesAction(values, formType)
      .then()
      // eslint-disable-next-line no-console
      .catch(console.error)
      .finally(() => dispatch(setSaveLoadingDoctorsAction(false)));
  }, []);

  const setModalVisible = useCallback((visible, formType) => {
    globalDispatch(setModalVisibleAction(visible, formType));
  }, []);

  const getHospitalDetails = useCallback(id => getHospitalDetailsAction(id), []);

  return (
    <DoctorsContext.Provider
      value={{
        ...state,
        ...globalState,
        getListDoctors,
        selectDoctor,
        saveDoctorValues,
        setModalVisible,
        getHospitalDetails,
      }}
    >
      {children}
    </DoctorsContext.Provider>
  );
};

export const withDoctorContext = WrapperComponent => props => {
  return (
    <DoctorsContextProvider>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <WrapperComponent {...props} />
    </DoctorsContextProvider>
  );
};

export const useDoctorsContext = () => {
  const value = useContext(DoctorsContext);
  if (isNil(value) && isEmpty(value)) throw new Error('Only works wrapper DoctorsContextProvider');
  return {
    formType: value.formType,
    total: value.total,
    modalVisible: value.modalVisible,
    doctors: value.doctors,
    hospitalDoctorsList: value.hospitalDoctorsList,
    listLoading: value.listLoading,
    saveLoading: value.saveLoading,
    doctorSelected: value.doctorSelected,
    getListDoctors: value.getListDoctors,
    selectDoctor: value.selectDoctor,
    saveDoctorValues: value.saveDoctorValues,
    setModalVisible: value.setModalVisible,
    getHospitalDetailsAction: value.getHospitalDetailsAction,
  };
};
