import { dbRef } from '../../../firebaseConfig';
import { ADD_FORM_TEXT, DELETE_FORM_TEXT, EDIT_FORM_TEXT } from '../../../commons/globalText';
import { isEmpty } from '../../../commons/util';

const hospitalRef = dbRef('hospital');

export const fetchHospitalsAction = async ({ limit = 2, next, prev, filters }) => {
  let ref = hospitalRef.collection('hospitals').orderBy('name');
  if (next) {
    ref = ref.startAfter(next.name);
  } else if (prev) {
    ref = ref.endBefore(prev.name);
  }
  if (filters) {
    Object.keys(filters).map(k => {
      if (k === 'name') {
        ref = ref.where(k, '>=', filters[k]).where(k, '<=', `${filters[k]}\uf8ff`);
      } else {
        ref = ref.where(k, '==', filters[k]);
      }
      return null;
    });
  }
  if (prev) ref = ref.limitToLast(limit);
  else ref = ref.limit(limit);
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
