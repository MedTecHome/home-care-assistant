import { dbFirebase } from '../../../firebaseConfig';
import { ADD_FORM_TEXT, DELETE_FORM_TEXT, EDIT_FORM_TEXT } from '../../../commons/globalText';

const MedicinesRef = dbFirebase.collection('medicines');

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
