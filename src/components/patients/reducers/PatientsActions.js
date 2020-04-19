import { dbFirebase } from '../../../firebaseConfig';
import {
  ADD_FORM_TEXT,
  DELETE_FORM_TEXT,
  EDIT_FORM_TEXT,
  LIST_PATIENTS,
  SELECTED_PATIENTS,
} from '../../../commons/globalText';

export const setListPatientsAction = (list, total) => ({
  type: LIST_PATIENTS,
  list,
  total,
});

export const setSelectedPatientsAction = selected => ({
  type: SELECTED_PATIENTS,
  selected,
});

export const listPatientsFetch = ({ limit = 2, page, doctorId, ...params }) => {
  // eslint-disable-next-line no-console
  console.log(params);
  const sortField = 'name';
  let ref = dbFirebase.collection('patients').orderBy(sortField, 'asc');
  if (page && page.next) {
    ref = ref.startAfter(page.next[sortField]).limit(limit);
  } else if (page && page.prev) {
    ref = ref.endBefore(page.prev[sortField]).limitToLast(limit);
  } else {
    ref = ref.limit(limit);
  }
  return ref.get();
};

export const saveDataOfPatientFetch = ({ id, ...values }, formType) => {
  switch (formType) {
    case ADD_FORM_TEXT: {
      // eslint-disable-next-line no-console
      return dbFirebase.collection('patients').add(values);
    }
    case EDIT_FORM_TEXT: {
      // eslint-disable-next-line no-console
      return dbFirebase.collection('patients').doc(id).update(values);
    }
    case DELETE_FORM_TEXT: {
      id.map(a => {
        // eslint-disable-next-line no-console
        dbFirebase.collection('patients').doc(a.id).delete().catch(console.error);
        return null;
      });
      return null;
    }
    default:
      return null;
  }
};
