import { retriveData } from './utils';

const getProfiles = async (limit, offset, filters, sort = true) => {
  try {
    return await retriveData(
      'profile/profiles',
      limit,
      offset,
      filters,
      sort ? 'fullname' : undefined,
      sort ? 'asc' : undefined
    );
  } catch (e) {
    throw new Error(e);
  }
};

export default getProfiles;
