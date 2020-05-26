import { retriveData } from './utils';

const getMedicines = async (limit, offset, filters) => {
  try {
    return await retriveData('medicine/medicines', limit, offset, filters, undefined, undefined);
  } catch (e) {
    throw new Error(e);
  }
};

export default getMedicines;
