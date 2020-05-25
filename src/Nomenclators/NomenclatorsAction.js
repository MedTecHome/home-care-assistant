import { apiData } from '../axiosApiRequest';

export const getNomenclatorListActions = async momenclator => {
  const response = await apiData.get(`/getNomenclators/?nomenclator=${momenclator}`);
  return response.data;
};

export const getNomenclatorByIdActions = async (momenclator, id = '-one') => {
  const response = await apiData.get(`/getNomenclators/?nomenclator=${momenclator}&id=${id}`);
  return response.data;
};
