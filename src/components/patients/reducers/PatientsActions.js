import { dbFirebase } from '../../../firebaseConfig';
import {
  ADD_FORM_TEXT,
  DELETE_FORM_TEXT,
  EDIT_FORM_TEXT,
  LIST_PATIENTS,
  TOTAL_LIST_PATIENTS,
  SELECTED_PATIENT,
  SAVE_PATIENTS_LOADING,
  LIST_PATIENTS_LOADING,
} from '../../../commons/globalText';

export const setListPatientsAction = list => ({
  type: LIST_PATIENTS,
  list,
});

export const setListLoadingAction = flag => ({
  type: LIST_PATIENTS_LOADING,
  flag,
});

export const setSaveLoadingAction = flag => ({
  type: SAVE_PATIENTS_LOADING,
  flag,
});

export const setTotalPatientsAction = total => ({
  type: TOTAL_LIST_PATIENTS,
  total,
});

export const setSelectedPatientsAction = selected => ({
  type: SELECTED_PATIENT,
  selected,
});

export const getRefPatients = () => {
  return dbFirebase.collection('home-care-assistant').doc('patients');
};

export const saveDataOfPatientFetchAction = ({ id, ...values }, formType) => {
  switch (formType) {
    case ADD_FORM_TEXT: {
      return dbFirebase.collection('home-care-assistant').doc('patients').collection('patients').add(values);
    }
    case EDIT_FORM_TEXT: {
      return dbFirebase.collection('home-care-assistant').doc('patients').collection('patients').doc(id).update(values);
    }
    case DELETE_FORM_TEXT: {
      return dbFirebase.collection('home-care-assistant').doc('patients').collection('patients').doc(id).delete();
    }
    default:
      return null;
  }
};
