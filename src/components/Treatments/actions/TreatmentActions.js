import moment from 'moment';
import { dbRef } from '../../../firebaseConfig';
import { apiData } from '../../../axiosApiRequest';
import { ADD_FORM_TEXT, DELETE_FORM_TEXT, EDIT_FORM_TEXT } from '../../../commons/globalText';
import mutateTreatmentValues from './mutations';
import { isEmpty, queryFromParams } from '../../../helpers/utils';

const TreatmentRef = dbRef('treatment').collection('treatments');

export const getListTreatmentsAction = async ({ limit, offset, filters }) => {
  const params = { limit, offset, ...filters };
  const query = queryFromParams(params);
  const response = await apiData.get(`/getTreatments${query && `?${query}`}`);
  return response.data;
};

export const findByIdAction = async (id, fields = []) => {
  const result = await TreatmentRef.doc(id).get();
  const data = fields.map(k => ({ [k]: result.data()[k] })).reduce((a, b) => ({ ...a, ...b }), {});
  return { id: result.id, ...(isEmpty(fields) ? result.data() : data) };
};

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

export const saveValuesAction = async (values, formType) => {
  if (formType === ADD_FORM_TEXT) {
    await addValues(values);
  } else if (formType === EDIT_FORM_TEXT) {
    await editValues(values);
  } else if (formType === DELETE_FORM_TEXT) {
    await deleteValues(values);
  }
};
