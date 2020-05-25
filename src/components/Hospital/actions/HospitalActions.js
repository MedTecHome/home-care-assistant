import { dbRef } from '../../../firebaseConfig';
import { apiData } from '../../../axiosApiRequest';
import { ADD_FORM_TEXT, DELETE_FORM_TEXT, EDIT_FORM_TEXT } from '../../../commons/globalText';
import { isEmpty, queryFromParams } from '../../../helpers/utils';

const hospitalRef = dbRef('hospital');

export const fetchHospitalsAction = async ({ limit = 0, offset = 0, filters }) => {
  const params = { limit, offset, ...filters };
  const query = queryFromParams(params);
  const response = await apiData.get(`/getHospitals${query && `?${query}`}`);
  return response.data;
};

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
