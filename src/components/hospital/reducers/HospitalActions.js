import { isEmpty } from 'ramda';
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

export const fetchHospitalsAction = async ({ filters }) => {
  let ref = hospitalRef.collection('hospitals').orderBy('name');
  if (filters && !isEmpty(filters)) {
    Object.keys(filters).map(k => {
      ref = ref.where(k, '>=', filters[k]);
      return null;
    });
  }
  return (await ref.get()).docChanges().map(({ doc }) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getHospitalByIdAction = async (id, fields = []) => {
  const ref = await hospitalRef.collection('hospitals').doc(id).get();
  const data = fields.map(k => ({ [k]: ref.data()[k] })).reduce((a, b) => ({ ...a, ...b }), {});
  return { id: ref.id, ...(isEmpty(fields) ? ref.data() : data) };
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
