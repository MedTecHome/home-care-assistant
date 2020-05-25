import { apiData } from '../../../axiosApiRequest';
import { queryFromParams } from '../../../helpers/utils';

const getMonitoringListAction = async ({ limit, offset, filters }) => {
  const params = { limit, offset, ...filters };
  const query = queryFromParams(params);
  const response = await apiData.get(`/getMonitoring${query && `?${query}`}`);

  return response.data;
};

export default getMonitoringListAction;
