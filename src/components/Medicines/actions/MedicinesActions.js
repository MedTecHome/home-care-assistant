import { dbRef } from '../../../firebaseConfig';
import { ADD_FORM_TEXT, DELETE_FORM_TEXT, EDIT_FORM_TEXT } from '../../../commons/globalText';
import { isEmpty } from '../../../helpers/utils';
import getNomenclator from '../../../services/nomenclators';

const MedicinesRef = dbRef('medicine').collection('medicines');

export const medicineModel = ({
  concentrationCant = '',
  doseCant = '',
  frequency = '',
  concentrationType = '',
  doseType = '',
  administrationType = '',
  observations = ''
}) => ({
  concentrationCant,
  doseCant,
  frequency,
  observations,
  concentrationType,
  doseType,
  administrationType
});

export const getMedicineByIdAction = async (id, fields = []) => {
  const ref = await MedicinesRef.doc(id).get();
  const data = fields.map(k => ({ [k]: ref.data()[k] })).reduce((a, b) => ({ ...a, ...b }), {});
  let result = isEmpty(fields) ? ref.data() : data;
  if (result.administrationType) {
    const administrationTypeObj = await getNomenclator('administrationroute', result.administrationType);
    result = { ...result, administrationTypeObj };
  }
  if (result.doseType) {
    const doseTypeObj = await getNomenclator('dosis', result.doseType);
    result = { ...result, doseTypeObj };
  }
  if (result.concentrationType) {
    const concentrationTypeObj = await getNomenclator('concentrations', result.concentrationType);
    result = { ...result, concentrationTypeObj };
  }
  return { id: ref.id, ...result };
};

const addValuesAction = async ({ id, ...values }) => {
  const result = { ...values, ...medicineModel(values) };
  await MedicinesRef.add(result);
};

const editValuesAction = async ({ id, ...values }) => {
  const result = { ...values, ...medicineModel(values) };
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
