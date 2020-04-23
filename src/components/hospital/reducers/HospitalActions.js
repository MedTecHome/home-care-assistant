import { dbFirebase } from '../../../firebaseConfig';
import {
  ADD_FORM_TEXT,
  DELETE_FORM_TEXT,
  EDIT_FORM_TEXT,
  LIST_HOSPITAL,
  LIST_HOSPITAL_LOADING,
  SAVE_HOSPITAL_LOADING,
  SELECTED_HOSPITAL,
  TOTAL_LIST_HOSPITAL,
} from '../../../commons/globalText';

export const setListHospitalAction = list => ({
  type: LIST_HOSPITAL,
  list,
});

export const setTotalHospitalAction = total => ({
  type: TOTAL_LIST_HOSPITAL,
  total,
});

export const setListHospitalLoadingAction = flag => ({
  type: LIST_HOSPITAL_LOADING,
  flag,
});

export const setSaveHospitalLoadingAction = flag => ({
  type: SAVE_HOSPITAL_LOADING,
  flag,
});

export const selectHospitalsFromListAction = selected => ({
  type: SELECTED_HOSPITAL,
  selected,
});

export const fetchHospitalsAction = () => {
  return dbFirebase.collection('home-care-assistant').doc('hospital');
};

export const getHospitalDetailsAction = id => {
  return dbFirebase.collection('home-care-assistant').doc('hospital').collection('hospitals').doc(id);
};

export const saveHospitalValuesAction = ({ id, ...values }, form) => {
  const ref = dbFirebase.collection('home-care-assistant').doc('hospital').collection('hospitals');
  if (form === ADD_FORM_TEXT) {
    return ref.add(values);
  }
  if (form === EDIT_FORM_TEXT) {
    return ref.doc(id).update(values);
  }
  if (form === DELETE_FORM_TEXT) {
    return ref.doc(id).delete();
  }
};
