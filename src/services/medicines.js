import { retriveData, retriveDoc } from './utils';

const getMedicines = async (limit, page, filters) => {
  try {
    return await retriveData('medicines', limit, page, filters);
  } catch (e) {
    throw new Error(e);
  }
};

export const getMedicineById = id => {
  return retriveDoc(`medicines/${id}`);
};

export default getMedicines;
