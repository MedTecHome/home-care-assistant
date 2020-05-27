import { dbRef } from '../../../firebaseConfig';
import { ADD_FORM_TEXT, DELETE_FORM_TEXT, EDIT_FORM_TEXT } from '../../../commons/globalText';
import { isEmpty } from '../../../helpers/utils';

const hospitalRef = dbRef('hospital');

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
