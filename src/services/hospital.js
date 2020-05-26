import { retriveData } from './utils';

const getHopitals = async (limit, offset, filters) => {
  try {
    return await retriveData('hospital/hospitals', limit, offset, filters, undefined, undefined);
  } catch (e) {
    throw new Error(e);
  }
};

export default getHopitals;
