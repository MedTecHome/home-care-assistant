import {
  ADD_FORM_TEXT,
  DELETE_FORM_TEXT,
  EDIT_FORM_TEXT,
  LIST_DOCTORS,
  LIST_DOCTORS_LOADING,
  SAVE_DOCTORS_LOADING,
  SELECTED_DOCTOR,
  TOTAL_LIST_DOCTORS,
} from '../../../commons/globalText';
import { dbFirebase } from '../../../firebaseConfig';

export const setTotalDoctorsAction = total => ({
  type: TOTAL_LIST_DOCTORS,
  total,
});

export const setListDoctorsAction = list => ({
  type: LIST_DOCTORS,
  list,
});

export const setListLoadingDoctorsAction = flag => ({
  type: LIST_DOCTORS_LOADING,
  flag,
});

export const setSaveLoadingDoctorsAction = flag => ({
  type: SAVE_DOCTORS_LOADING,
  flag,
});

export const setSelectedDoctorAction = selected => ({
  type: SELECTED_DOCTOR,
  selected,
});

// eslint-disable-next-line no-unused-vars
export const getRefDoctorsAction = () => {
  return dbFirebase.collection('home-care-assistant').doc('doctors');
};

export const saveDoctorValuesAction = ({ id, ...values }, formType) => {
  const ref = dbFirebase.collection('home-care-assistant').doc('doctors').collection('doctors');
  if (formType === ADD_FORM_TEXT) {
    return ref.add(values);
  }
  if (formType === EDIT_FORM_TEXT) {
    return ref.doc(id).update(values);
  }
  if (formType === DELETE_FORM_TEXT) {
    return ref.doc(id).delete();
  }
  return Promise;
};
