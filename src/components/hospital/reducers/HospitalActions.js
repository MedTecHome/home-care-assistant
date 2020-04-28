import { dbRef } from '../../../firebaseConfig';
import {
  ADD_FORM_TEXT,
  DELETE_FORM_TEXT,
  EDIT_FORM_TEXT,
  LIST_HOSPITAL,
  LIST_HOSPITAL_LOADING,
  SELECTED_HOSPITAL,
} from '../../../commons/globalText';

const hospitalRef = dbRef('hospital');

export const setListHospitalAction = list => ({
  type: LIST_HOSPITAL,
  list,
});

export const setListHospitalLoadingAction = flag => ({
  type: LIST_HOSPITAL_LOADING,
  flag,
});

export const selectHospitalsFromListAction = selected => ({
  type: SELECTED_HOSPITAL,
  selected,
});

export const fetchHospitalsAction = () => {
  return hospitalRef;
};

export const getHospitalByIdAction = async id => {
  const ref = await hospitalRef.collection('hospitals').doc(id).get();
  return { id: ref.id, ...ref.data() };
};

export const saveHospitalValuesAction = async ({ id, ...values }, form) => {
  const ref = hospitalRef.collection('hospitals');
  if (form === ADD_FORM_TEXT) {
    await ref.add(values);
  }
  if (form === EDIT_FORM_TEXT) {
    await ref.doc(id).update(values);
  }
  if (form === DELETE_FORM_TEXT) {
    await ref.doc(id).delete();
  }
};
