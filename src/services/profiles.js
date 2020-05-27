import { retriveData } from './utils';

const getProfiles = async (limit, offset, filters) => {
  try {
    return await retriveData('profile/profiles', limit, offset, filters, 'fullname', 'asc');
  } catch (e) {
    throw new Error(e);
  }
};

export default getProfiles;
