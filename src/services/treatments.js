import { retriveData } from './utils';

const getTreatments = async (limit, offset, filters) => {
  try {
    return await retriveData('treatment/treatments', limit, offset, filters, 'name', 'asc');
  } catch (e) {
    throw new Error(e);
  }
};

export default getTreatments;
