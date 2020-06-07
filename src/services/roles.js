import { retriveData, retriveDoc } from './utils';

const getRoles = async (limit, offset, filters) => {
  try {
    return await retriveData('roles', limit, offset, filters, 'name', 'asc');
  } catch (e) {
    throw new Error(e);
  }
};

export const getRoleById = async role => {
  try {
    return await retriveDoc(`roles/${role}`);
  } catch (e) {
    throw new Error(e);
  }
};

export default getRoles;
