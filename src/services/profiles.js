import { retriveData, retriveDoc, createDoc, editDoc, deleteDoc } from './utils';
import { apiFetch } from '../axiosApiRequest';
import specificProfile from '../schema/profiles';

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

export const addProfile = async ({ id, ...values }) => {
  const path = `profiles`;
  try {
    await createDoc(path, specificProfile(values));
  } catch (e) {
    throw new Error(e);
  }
};

export const editProfile = async ({ id, ...values }) => {
  const path = `profiles/${id}`;
  try {
    await editDoc(path, specificProfile(values));
  } catch (e) {
    throw new Error(e);
  }
};

export const deleteProfile = async ({ id }) => {
  const path = `profiles/${id}`;
  try {
    await deleteDoc(path);
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
