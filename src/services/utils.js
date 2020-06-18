import { apiFetch } from '../axiosApiRequest';
import { queryFromParams } from '../helpers/utils';

// eslint-disable-next-line no-unused-vars
const retriveData = async (path, limit = 10, page = 0, filters) => {
  try {
    const query = queryFromParams({ limit, page, ...filters });
    const response = await apiFetch.get(`/${path}${query && `?${query}`}`);
    return response.data;
  } catch (e) {
    throw new Error(e.message);
  }
};

const retriveDoc = async path => {
  try {
    const response = await apiFetch.get(`/${path}`);
    return response.data;
  } catch (e) {
    throw new Error(e.message);
  }
};

const createDoc = async (path, values) => {
  try {
    await apiFetch.post(`/${path}`, values);
  } catch (e) {
    throw new Error(e.message);
  }
};

const editDoc = async (path, values) => {
  try {
    await apiFetch.put(`/${path}`, values);
  } catch (e) {
    throw new Error(e.message);
  }
};

const deleteDoc = async path => {
  try {
    await apiFetch.delete(`/${path}`);
  } catch (e) {
    throw new Error(e.message);
  }
};

const setPostRequest = async (path, params) => {
  try {
    await apiFetch.post(`/${path}`, params);
  } catch (e) {
    throw new Error(e.message);
  }
};

export { retriveData, retriveDoc, createDoc, editDoc, deleteDoc, setPostRequest };
