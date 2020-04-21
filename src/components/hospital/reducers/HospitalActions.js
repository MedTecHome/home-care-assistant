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

export const fetchHospitalsAction = ({ limit = 2, page }) => {
  const sortfield = 'name';
  let ref = dbFirebase.collection('hospital').orderBy(sortfield, 'asc');
  if (page && page.next) {
    ref = ref.startAfter(page.next[sortfield]).limit(limit);
  } else if (page && page.prev) {
    ref = ref.endBefore(page.prev[sortfield]).limitToLast(limit);
  } else {
    ref = ref.limit(limit);
  }
  return ref;
};

export const saveHospitalValuesAction = ({ id, ...values }, form) => {
  if (form === ADD_FORM_TEXT) {
    dbFirebase
      .collection('')
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
