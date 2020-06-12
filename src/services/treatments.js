import { retriveData, retriveDoc } from './utils';

const getTreatments = async (limit, page, filters) => {
  try {
    return await retriveData('treatments', limit, page, filters);
  } catch (e) {
    throw new Error(e);
  }
};

export const getTreatmentById = async id => {
  return retriveDoc(`treatments/${id}`);
};

export default getTreatments;
