import { retriveData } from './utils';

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

export default getTreatments;
