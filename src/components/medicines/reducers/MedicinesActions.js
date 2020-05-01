import { dbRef } from '../../../firebaseConfig';
import { ADD_FORM_TEXT, DELETE_FORM_TEXT, EDIT_FORM_TEXT } from '../../../commons/globalText';

const MedicinesRef = dbRef('medicine').collection('medicines');

export const getMedicinesListAction = async ({ filters }) => {
  let ref = MedicinesRef;
  Object.keys(filters).map(k => {
    ref = ref.where(k, '==', filters[k]);
    return null;
  });
  return (await ref.get()).docChanges().map(({ doc }) => ({ id: doc.id, ...doc.data() }));
};

export const saveMedicineValuesActions = async ({ id, ...values }, formType) => {
  if (formType === ADD_FORM_TEXT) {
    await MedicinesRef.add(values);
  } else if (formType === EDIT_FORM_TEXT) {
    await MedicinesRef.doc(id).update(values);
  } else if (formType === DELETE_FORM_TEXT) {
    await MedicinesRef.doc(id).delete();
  }
};
