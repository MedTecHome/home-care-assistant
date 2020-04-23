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
  SET_LIST_HOSPITALS_DOCTORS,
  SET_LIST_DOCTORS_ON_PATIENTS,
} from '../../../commons/globalText';

export const setListPatientsAction = list => ({
  type: LIST_PATIENTS,
  list,
});

export const setListPatientsLoadingAction = flag => ({
  type: LIST_PATIENTS_LOADING,
  flag,
});

export const setListDoctorOnPatientAction = doctor => ({
  type: SET_LIST_DOCTORS_ON_PATIENTS,
  doctor,
});

export const setSavePatientLoadingAction = flag => ({
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

export const saveDataOfPatientFetchAction = ({ id, ...values }, formType) => {
  const ref = dbFirebase.collection('home-care-assistant').doc('patient').collection('patients');
  switch (formType) {
    case ADD_FORM_TEXT: {
      return ref.add(values);
    }
    case EDIT_FORM_TEXT: {
      return ref.doc(id).update(values);
    }
    case DELETE_FORM_TEXT: {
      return ref.doc(id).delete();
    }
    default:
      return null;
  }
};
