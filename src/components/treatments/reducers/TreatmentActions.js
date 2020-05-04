import { isEmpty } from 'ramda';
import { dbRef } from '../../../firebaseConfig';
import { ADD_FORM_TEXT, DELETE_FORM_TEXT, EDIT_FORM_TEXT } from '../../../commons/globalText';

const TreatmentRef = dbRef('treatment').collection('treatments');

export const getListTreatmentAction = async ({ filters = {} }) => {
  let ref = TreatmentRef;
  Object.keys(filters).map(k => {
    ref = ref.where(k, '==', filters[k]);
    return null;
  });

  return (await ref.get()).docChanges().map(({ doc }) => ({ id: doc.id, ...doc.data() }));
};

export const findByIdAction = async (id, fields = []) => {
  const result = await TreatmentRef.doc(id).get();
  const data = fields.map(k => ({ [k]: result.data()[k] })).reduce((a, b) => ({ ...a, ...b }), {});
  return { id: result.id, ...(isEmpty(fields) ? result.data() : data) };
};

export const saveValuesAction = async ({ id, ...values }, formType) => {
  if (formType === ADD_FORM_TEXT) {
    await TreatmentRef.add(values);
  } else if (formType === EDIT_FORM_TEXT) {
    await TreatmentRef.doc(id).update(values);
  } else if (formType === DELETE_FORM_TEXT) {
    await TreatmentRef.doc(id).delete();
  }
};
