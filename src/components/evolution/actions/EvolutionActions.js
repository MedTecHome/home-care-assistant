import { apiData } from '../../../axiosApiRequest';
import { queryFromParams } from '../../../helpers/utils';

const getEvolutionTreatments = async params => {
  const query = queryFromParams(params);
  const treatments = await apiData.get(`/getEvolutionTreatments${query && `?${query}`}`);
  return treatments.data;
};

const getEvolutionClinical = async params => {
  const query = queryFromParams(params);
  const clinicaltest = await apiData.get(`/getEvolutionClinical${query && `?${query}`}`);
  return clinicaltest.data;
};

export { getEvolutionTreatments, getEvolutionClinical };
