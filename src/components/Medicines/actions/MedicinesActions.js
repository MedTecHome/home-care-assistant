import { dbRef } from '../../../firebaseConfig';
import { apiData } from '../../../axiosApiRequest';
import { ADD_FORM_TEXT, DELETE_FORM_TEXT, EDIT_FORM_TEXT } from '../../../commons/globalText';
import { getNomenclatorByIdActions } from '../../../Nomenclators/NomenclatorsAction';
import { isEmpty, queryFromParams } from '../../../helpers/utils';

const MedicinesRef = dbRef('medicine').collection('medicines');

export const mutateNomenc = async ({ concentrationType, doseType, administrationType }) => ({
  ...(concentrationType
    ? { concentrationType: await getNomenclatorByIdActions('concentrations', concentrationType) }
    : {}),
  ...(doseType ? { doseType: await getNomenclatorByIdActions('dosis', doseType) } : {}),
  ...(administrationType
    ? { administrationType: await getNomenclatorByIdActions('administrationroute', administrationType) }
    : {})
});

export const getMedicinesListAction = async ({ limit, offset, filters }) => {
  const params = { limit, offset, ...filters };
  const query = queryFromParams(params);
  const response = await apiData(`/getMedicines${query && `?${query}`}`);
  return response.data;
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
