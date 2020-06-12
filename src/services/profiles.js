import { retriveData, retriveDoc } from './utils';

const getProfiles = async (limit, page, filters, sort = true) => {
  try {
    const response = await retriveData(
      'profiles',
      limit,
      page,
      filters,
      sort ? 'fullname' : undefined,
      sort ? 'asc' : undefined
    );
    return { ...response };
  } catch (e) {
    throw new Error(e);
  }
};

export const getProfileById = async id => {
  try {
    const response = await retriveDoc(`profiles/${id}`);
    if (response) {
      return response;
    }
    return null;
  } catch (e) {
    throw new Error(e);
  }
};

export default getProfiles;
