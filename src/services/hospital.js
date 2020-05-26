import { retriveData } from './utils';

const getHospitals = async (limit, offset, filters) => {
  try {
    return await retriveData('hospital/hospitals', limit, offset, filters, undefined, undefined);
  } catch (e) {
    throw new Error(e);
  }
};

export default getHospitals;
