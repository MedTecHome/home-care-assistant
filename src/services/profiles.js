import moment from 'moment';
import { retriveData, retriveDoc } from './utils';

const mutateToClient = ({ birthday, ...rest }) => {
  let bt;
  if (moment(birthday).isValid()) {
    bt = moment(birthday).format('DD-MM-YYYY');
  } else if (moment(birthday.toDate()).isValid()) {
    bt = moment(birthday.toDate()).format('DD-MM-YYYY');
  }
  return { ...rest, ...(birthday ? { birthday: bt } : {}) };
};

const getProfiles = async (limit, offset, filters, sort = true) => {
  try {
    const response = await retriveData(
      'profile/profiles',
      limit,
      offset,
      filters,
      sort ? 'fullname' : undefined,
      sort ? 'asc' : undefined
    );
    return { ...response, data: response.data.map(profile => mutateToClient(profile)) };
  } catch (e) {
    throw new Error(e);
  }
};

export const getProfileById = async id => {
  try {
    const response = await retriveDoc(`profile/profiles/${id}`);
    return mutateToClient(response);
  } catch (e) {
    throw new Error(e);
  }
};

export default getProfiles;
