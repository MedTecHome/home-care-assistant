import { apiDataFrom } from '../../../apiConfig';
import { firebaseConfig } from '../../../firebaseConfig';

export const SetListHospital = ({ list, total }) => ({
  type: 'LIST_HOSPITAL',
  list,
  total,
});

export const FetchHospitals = async (params) => {
  // eslint-disable-next-line no-console
  console.log(params);
  const response = await apiDataFrom.get(`${firebaseConfig.projectId}/databases/(default)/documents/hospital`);
  return response.data;
};
