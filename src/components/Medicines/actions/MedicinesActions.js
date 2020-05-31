import { dbRef } from '../../../firebaseConfig';
import { ADD_FORM_TEXT, DELETE_FORM_TEXT, EDIT_FORM_TEXT } from '../../../commons/globalText';
import { isEmpty } from '../../../helpers/utils';
import getNomenclator from '../../../services/nomenclators';

const MedicinesRef = dbRef('medicine').collection('medicines');

export const mutateNomenc = async ({ concentrationType, doseType, administrationType, observations = '' }) => ({
  observations,
  ...(concentrationType ? { concentrationType: await getNomenclator('concentrations', concentrationType) } : {}),
  ...(doseType ? { doseType: await getNomenclator('dosis', doseType) } : {}),
  ...(administrationType ? { administrationType: await getNomenclator('administrationroute', administrationType) } : {})
});

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
