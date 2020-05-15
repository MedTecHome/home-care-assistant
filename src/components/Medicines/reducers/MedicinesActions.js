import { dbRef } from '../../../firebaseConfig';
import { ADD_FORM_TEXT, DELETE_FORM_TEXT, EDIT_FORM_TEXT } from '../../../commons/globalText';
import { getNomById } from '../../../nomenc/NomencAction';
import { isEmpty } from '../../../helpers/utils';

const MedicinesRef = dbRef('medicine').collection('medicines');

export const mutateNomenc = async ({ concentrationType, doseType, administrationType }) => ({
  ...(concentrationType ? { concentrationType: await getNomById('concentrations')(concentrationType) } : {}),
  ...(doseType ? { doseType: await getNomById('dosis')(doseType) } : {}),
  ...(administrationType ? { administrationType: await getNomById('administrationroute')(administrationType) } : {})
});

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

const addValuesAction = async ({ id, ...values }) => {
  const mut = await mutateNomenc(values);
  const result = { ...values, ...mut };
  await MedicinesRef.add(result);
};

const editValuesAction = async ({ id, ...values }) => {
  const mut = await mutateNomenc(values);
  const result = { ...values, ...mut };
  await MedicinesRef.doc(id).update(result);
};

const deleteValuesAction = async ({ id }) => {
  await MedicinesRef.doc(id).delete();
};

export const saveMedicineValuesActions = async (values, formType) => {
  if (formType === ADD_FORM_TEXT) {
    await addValuesAction(values);
  } else if (formType === EDIT_FORM_TEXT) {
    await editValuesAction(values);
  } else if (formType === DELETE_FORM_TEXT) {
    await deleteValuesAction(values);
  }
};
