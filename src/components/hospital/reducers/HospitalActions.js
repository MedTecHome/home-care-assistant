import { dbFirebase } from '../../../firebaseConfig';
import {
  ADD_FORM_TEXT,
  EDIT_FORM_TEXT,
  LIST_HOSPITAL,
  SELECTED_HOSPITALS,
  SET_HOSPITAL_MODAL_VISIBLE,
} from '../../../commons/globalText';

export const setListHospital = ({ list, total }) => ({
  type: LIST_HOSPITAL,
  list,
  total,
});

export const selectHospitalsFromList = ids => ({
  type: SELECTED_HOSPITALS,
  ids,
});

export const setHospitalModalVisible = (flag, formType) => ({
  type: SET_HOSPITAL_MODAL_VISIBLE,
  flag,
  formType,
});

export const fetchHospitals = async params => {
  // eslint-disable-next-line no-console
  console.log(params);
  const response = dbFirebase.collection('hospital').orderBy('name', 'asc').get();
  return response;
};

export const saveHospitalValues = async ({ id, ...values }, form) => {
  if (form === ADD_FORM_TEXT) {
    const response = await dbFirebase.collection('hospital').add(values);
    return response;
  }
  if (form === EDIT_FORM_TEXT) {
    const response = await dbFirebase.collection('hospital').doc(id).update(values);
    return response;
  }
};
