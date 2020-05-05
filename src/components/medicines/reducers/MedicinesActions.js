import { isEmpty } from 'ramda';
import { dbRef } from '../../../firebaseConfig';
import { ADD_FORM_TEXT, DELETE_FORM_TEXT, EDIT_FORM_TEXT } from '../../../commons/globalText';

const MedicinesRef = dbRef('medicine').collection('medicines');

export const getMedicinesListAction = async ({ filters }) => {
  let ref = MedicinesRef;
  Object.keys(filters).map(k => {
    if (k === 'name') {
      ref = ref.where(k, '>=', filters[k]).where(k, '<=', `${filters[k]}\uf8ff`);
    } else {
      ref = ref.where(k, '==', filters[k]);
    }
    return null;
  });
  return (await ref.get()).docChanges().map(({ doc }) => ({ id: doc.id, ...doc.data() }));
};

export const getMedicineByIdAction = async (id, fields = []) => {
  const ref = await MedicinesRef.doc(id).get();
  const data = fields.map(k => ({ [k]: ref.data()[k] })).reduce((a, b) => ({ ...a, ...b }), {});
  return { id: ref.id, ...(isEmpty(fields) ? ref.data() : data) };
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
