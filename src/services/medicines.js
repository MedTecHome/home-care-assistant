import { retriveData } from './utils';

const getMedicines = async (limit, offset, filters) => {
  try {
    return await retriveData('medicine/medicines', limit, offset, filters, 'name', 'asc');
  } catch (e) {
    throw new Error(e);
  }
};

export default getMedicines;
