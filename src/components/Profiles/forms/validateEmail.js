import { getProfilesAction } from '../reducers/ProfileActions';

const validateEmail = async value => {
  const response = await getProfilesAction({ filters: { email: value } });
  return response.length > 0 ? 'Ya existe una cuenta asociada a ese correo.' : null;
};

export default validateEmail;
