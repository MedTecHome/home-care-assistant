import { retriveData } from './utils';

const getTreatments = async (limit, offset, filters) => {
  try {
    return await retriveData('treatment/treatments', limit, offset, filters, undefined, undefined);
  } catch (e) {
    throw new Error(e);
  }
};

export default getTreatments;
