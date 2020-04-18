import { dbFirebase } from '../../../firebaseConfig';
import {
  ADD_FORM_TEXT,
  DELETE_FORM_TEXT,
  EDIT_FORM_TEXT,
  LIST_HOSPITAL,
  SELECTED_HOSPITALS,
  SET_HOSPITAL_MODAL_VISIBLE,
} from '../../../commons/globalText';

export const setListHospitalAction = ({ list, total }) => ({
  type: LIST_HOSPITAL,
  list,
  total,
});

export const selectHospitalsFromListAction = ids => ({
  type: SELECTED_HOSPITALS,
  ids,
});

export const setHospitalModalVisibleAction = (flag, formType) => ({
  type: SET_HOSPITAL_MODAL_VISIBLE,
  flag,
  formType,
});

export const fetchHospitalsAction = params => {
  // eslint-disable-next-line no-console
  console.log(params);
  return dbFirebase.collection('hospital').orderBy('name', 'asc').get();
};

export const saveHospitalValuesAction = ({ id, ...values }, form) => {
  if (form === ADD_FORM_TEXT) {
    dbFirebase
      .collection('hospital')
      .add(values)
      // eslint-disable-next-line no-console
      .catch(e => console.error(e));
  } else if (form === EDIT_FORM_TEXT) {
    dbFirebase
      .collection('hospital')
      .doc(id)
      .update(values)
      // eslint-disable-next-line no-console
      .catch(e => console.error(e));
  } else if (form === DELETE_FORM_TEXT) {
    id.map(hosp => {
      dbFirebase
        .collection('hospital')
        .doc(hosp.id)
        .delete()
        // eslint-disable-next-line no-console
        .catch(e => console.error(e));
      return null;
    });
  }
  return null;
};
