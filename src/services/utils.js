import { apiFetch } from '../axiosApiRequest';
import { queryFromParams } from '../helpers/utils';

// eslint-disable-next-line no-unused-vars
const retriveDataApi = async (path, limit = 10, page = 0, filters) => {
  const query = queryFromParams({ limit, page, ...filters });
  const response = await apiFetch.get(`/${path}${query && `?${query}`}`);
  return response.data;
};

const retriveDocApi = async path => {
  const response = await apiFetch.get(`/${path}`);
  return response.data;
};

const retriveData = retriveDataApi;
const retriveDoc = retriveDocApi;

export { retriveData, retriveDoc };
