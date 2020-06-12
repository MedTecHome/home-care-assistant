import { retriveData, retriveDoc } from './utils';

const getTreatments = async (limit, page, filters) => {
  try {
    return await retriveData(
      'treatments',
      limit,
      page,
      filters,
      filters.startDate || filters.endDate ? undefined : 'name',
      filters.startDate || filters.endDate ? undefined : 'asc'
    );
  } catch (e) {
    throw new Error(e);
  }
};

export const getTreatmentById = async id => {
  return retriveDoc(`treatments/${id}`);
};

export default getTreatments;
