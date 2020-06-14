import { retriveData, retriveDoc } from './utils';
import { apiFetch } from '../axiosApiRequest';

const getProfiles = async (limit, page, filters) => {
  try {
    const response = await retriveData('profiles', limit, page, filters);
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

export const getByEmail = async username => {
  try {
    const response = await apiFetch(`searchByEmail?email=${username}`);
    if (response) {
      return response;
    }
    return null;
  } catch (e) {
    throw new Error(e);
  }
};

export default getProfiles;
