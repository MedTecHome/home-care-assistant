import { apiData } from '../../../axiosApiRequest';

const getMonitoringListAction = async ({ limit, offset, filters }) => {
  const params = { limit, offset, ...filters };
  const query = Object.keys(params)
    .map(k => `${k}=${params[k]}`)
    .join('&');
  const response = await apiData.get(`/getMonitoring${query && `?${query}`}`);

  return response.data;
};

export default getMonitoringListAction;
