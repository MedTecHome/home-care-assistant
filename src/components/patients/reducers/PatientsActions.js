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

export const listPatientsFetch = ({ doctorId, ...params }) => {
  const ref = dbFirebase.collection('patients');
  if (doctorId) {
    ref.where('doctorId', '==', doctorId);
  }
  return ref.get();
};

export const saveDataOfPatientFetch = ({ id, values }) => {
  switch (values) {
    case ADD_FORM_TEXT: {
      // eslint-disable-next-line no-console
      dbFirebase.collection('patients').add(values).catch(console.error);
      break;
    }
    case EDIT_FORM_TEXT: {
      // eslint-disable-next-line no-console
      dbFirebase.collection('patients').doc(id).update(values).catch(console.error);
      break;
    }
    case DELETE_FORM_TEXT: {
      id.map(a => {
        // eslint-disable-next-line no-console
        dbFirebase.collection('patients').doc(a.id).delete().catch(console.error);
        return null;
      });
      break;
    }
    default:
      break;
  }
};
