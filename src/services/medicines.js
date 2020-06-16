import { retriveData, retriveDoc, createDoc, editDoc, deleteDoc } from './utils';
import Medicine from '../schema/medicines';

const getMedicines = async (limit, page, filters) => {
  try {
    return await retriveData('medicines', limit, page, filters);
  } catch (e) {
    throw new Error(e);
  }
};

export const getMedicineById = id => {
  return retriveDoc(`medicines/${id}`);
};

export const addMedicine = async ({ id, ...values }) => {
  try {
    const path = 'medicines';
    await createDoc(path, new Medicine(values));
  } catch (e) {
    throw new Error(e);
  }
};

export const editMedicine = async ({ id, ...values }) => {
  try {
    const path = `medicines/${id}`;
    await editDoc(path, new Medicine(values));
  } catch (e) {
    throw new Error(e);
  }
};

export const deleteMedicine = async ({ id }) => {
  try {
    const path = `medicines/${id}`;
    await deleteDoc(path);
  } catch (e) {
    throw new Error(e);
  }
};

export default getMedicines;
