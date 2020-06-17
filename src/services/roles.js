import { retriveData, retriveDoc } from './utils';

const getRoles = async (limit, page, filters) => {
  try {
    return await retriveData('roles', limit, page, filters, 'name', 'asc');
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getRoleById = async role => {
  try {
    return await retriveDoc(`roles/${role}`);
  } catch (e) {
    throw new Error(e.message);
  }
};

export default getRoles;
