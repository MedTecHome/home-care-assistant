import { isEmpty } from 'ramda';
import { dbRef } from '../../../firebaseConfig';
import { ADD_FORM_TEXT, DELETE_FORM_TEXT, EDIT_FORM_TEXT } from '../../../commons/globalText';
import mutateTreatmentValues from './mutations';

const TreatmentRef = dbRef('treatment').collection('treatments');

export const getListTreatmentsAction = async ({ limit = 2, next, prev, filters }) => {
  let ref = TreatmentRef.orderBy('startDate');
  if (next) {
    ref = ref.startAfter(next.statDate);
  } else if (prev) {
    ref = ref.endBefore(prev.statDate);
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
  return (await ref.get()).docChanges().map(({ doc }) => ({ id: doc.id, ...doc.data() }));
};

export const findByIdAction = async (id, fields = []) => {
  const result = await TreatmentRef.doc(id).get();
  const data = fields.map(k => ({ [k]: result.data()[k] })).reduce((a, b) => ({ ...a, ...b }), {});
  return { id: result.id, ...(isEmpty(fields) ? result.data() : data) };
};

export const saveValuesAction = async ({ id, ...values }, formType) => {
  const result = await mutateTreatmentValues(values);
  if (formType === ADD_FORM_TEXT) {
    await TreatmentRef.add(result);
  } else if (formType === EDIT_FORM_TEXT) {
    await TreatmentRef.doc(id).update(result);
  } else if (formType === DELETE_FORM_TEXT) {
    await TreatmentRef.doc(id).delete();
  }
};
