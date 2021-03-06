import { retriveData, retriveDoc, createDoc, editDoc, deleteDoc } from './utils';
import { apiData } from '../axiosApiRequest';
import specificProfile from '../schema/profiles';

const getProfiles = async (limit, page, filters) => {
  try {
    const response = await retriveData('profiles', limit, page, filters);
    return { ...response };
  } catch (e) {
    throw new Error(e.message);
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
    throw new Error(e.message);
  }
};

export const addProfile = async ({ id, password, ...values }) => {
  const path = `profiles`;
  const mutated = { ...specificProfile(values), password };
  try {
    await createDoc(path, mutated);
  } catch (e) {
    throw new Error(e.message);
  }
};

export const editProfile = async ({ id, ...values }) => {
  const path = `profiles/${id}`;
  try {
    await editDoc(path, specificProfile(values));
  } catch (e) {
    throw new Error(e.message);
  }
};

export const deleteProfile = async ({ id }) => {
  const path = `profiles/${id}`;
  try {
    await deleteDoc(path);
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getByEmail = async username => {
  try {
    const response = await apiData(`searchByEmail?email=${username}`);
    if (response) {
      return response;
    }
    return null;
  } catch (e) {
    throw new Error(e.message);
  }
};

export default getProfiles;
