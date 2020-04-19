import {
  ADD_FORM_TEXT,
  DELETE_FORM_TEXT,
  EDIT_FORM_TEXT,
  LIST_DOCTORS,
  SELECTED_DOCTORS,
} from '../../../commons/globalText';
import { dbFirebase } from '../../../firebaseConfig';

const sortField = 'name';

export const setListDoctorsAction = list => ({
  type: LIST_DOCTORS,
  list,
});

export const setSelectedDoctorsAction = selected => ({
  type: SELECTED_DOCTORS,
  selected,
});

// eslint-disable-next-line no-unused-vars
export const fetchListDoctorsAction = ({ limit = 5, page, ...parms }) => {
  let ref = dbFirebase.collection('doctors').orderBy(sortField);
  if (page.next) {
    ref = ref.startAfter(page.next[sortField]).limit(page);
  } else if (page.prev) {
    ref = ref.endBefore(page.prev[sortField]).limitToLast(page);
  } else {
    ref = ref.limit(limit);
  }
  return ref;
};

export const saveDoctorValuesAction = ({ id, ...values }, form) => {
  const ref = dbFirebase.collection('doctors');
  if (form === ADD_FORM_TEXT) {
    ref
      .add(values)
      .then(el => console.table(el))
      // eslint-disable-next-line no-console
      .catch(e => console.error(e));
  } else if (form === EDIT_FORM_TEXT) {
    ref
      .doc(id)
      .update(values)
      // eslint-disable-next-line no-console
      .catch(e => console.error(e));
  } else if (form === DELETE_FORM_TEXT) {
    id.map(dr => {
      ref
        .doc(dr.id)
        .delete()
        // eslint-disable-next-line no-console
        .catch(e => console.error(e));
      return null;
    });
  }
  return null;
};
