import { retriveData, retriveDoc } from './utils';

const getTreatments = async (limit, offset, filters) => {
  try {
    return await retriveData(
      'treatment/treatments',
      limit,
      offset,
      filters,
      filters.startDate || filters.endDate ? undefined : 'name',
      filters.startDate || filters.endDate ? undefined : 'asc'
    );
  } catch (e) {
    throw new Error(e);
  }
};

export const getTreatmentById = async id => {
  return retriveDoc(`treatment/treatments/${id}`);
};

export default getTreatments;
