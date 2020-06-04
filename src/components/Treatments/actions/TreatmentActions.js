import { dbRef } from '../../../firebaseConfig';
import { ADD_FORM_TEXT, DELETE_FORM_TEXT, EDIT_FORM_TEXT } from '../../../commons/globalText';
import mutateTreatmentValues from './mutations';

const TreatmentRef = dbRef('treatment').collection('treatments');

const addValues = async ({ id, ...values }) => {
  const result = await mutateTreatmentValues(values);
  await TreatmentRef.add(result);
};

const editValues = async ({ id, ...values }) => {
  const result = await mutateTreatmentValues(values);
  await TreatmentRef.doc(id).update(result);
};

const deleteValues = async ({ id }) => {
  await TreatmentRef.doc(id).delete();
};

const saveValuesAction = async (values, formType) => {
  if (formType === ADD_FORM_TEXT) {
    await addValues(values);
  } else if (formType === EDIT_FORM_TEXT) {
    await editValues(values);
  } else if (formType === DELETE_FORM_TEXT) {
    await deleteValues(values);
  }
};

export default saveValuesAction;
