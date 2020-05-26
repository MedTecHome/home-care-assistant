import { retriveData } from './utils';

const getProfiles = async (limit, offset, filters) => {
  try {
    return await retriveData('profile/profiles', limit, offset, filters, undefined, undefined);
  } catch (e) {
    throw new Error(e);
  }
};

const getAdmin = async (limit, offset, filters) => {
  try {
    return await retriveData('profile/profiles', limit, offset, {
      'role.id': 'admin',
      ...filters
    });
  } catch (e) {
    throw new Error(e);
  }
};

const getClinic = async (limit, offset, filters) => {
  try {
    return await retriveData('profile/profiles', limit, offset, {
      'role.id': 'clinic',
      ...filters
    });
  } catch (e) {
    throw new Error(e);
  }
};

const getDoctor = async (limit, offset, filters) => {
  try {
    return await retriveData('profile/profiles', limit, offset, {
      'role.id': 'doctor',
      ...filters
    });
  } catch (e) {
    throw new Error(e);
  }
};

const getPatient = async (limit, offset, filters) => {
  try {
    return await retriveData('profile/profiles', limit, offset, {
      'role.id': 'patient',
      ...filters
    });
  } catch (e) {
    throw new Error(e);
  }
};

export { getProfiles, getClinic, getAdmin, getDoctor, getPatient };
