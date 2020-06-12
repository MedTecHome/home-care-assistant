import { retriveData } from './utils';

const getMonitoring = async (limit, page, filters) => {
  try {
    return await retriveData('monitoring', limit, page, filters);
  } catch (e) {
    throw new Error(e);
  }
};

export default getMonitoring;
