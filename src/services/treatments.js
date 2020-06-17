import moment from 'moment';
import { retriveData, retriveDoc, createDoc, editDoc, deleteDoc } from './utils';
import Treatment from '../schema/treatments';

const mutateTreatmentValues = ({ startDate, endDate, ...rest }) => ({
  ...rest,
  startDate: moment(startDate).unix(),
  endDate: moment(endDate).unix()
});

const getTreatments = async (limit, page, filters) => {
  try {
    return await retriveData('treatments', limit, page, filters);
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getTreatmentById = async id => {
  return retriveDoc(`treatments/${id}`);
};

export const addTreatment = async ({ id, ...values }) => {
  try {
    const path = `treatments`;
    await createDoc(path, new Treatment(mutateTreatmentValues(values)));
  } catch (e) {
    throw new Error(e.message);
  }
};

export const editTreatment = async ({ id, ...values }) => {
  try {
    const path = `treatments/${id}`;
    await editDoc(path, new Treatment(mutateTreatmentValues(values)));
  } catch (e) {
    throw new Error(e.message);
  }
};

export const deleteTreatment = async ({ id }) => {
  try {
    const path = `treatments${id}`;
    await deleteDoc(path);
  } catch (e) {
    throw new Error(e.message);
  }
};

export default getTreatments;
