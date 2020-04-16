import { firebaseConfig } from '../../../firebaseConfig';
import { apiIdentitytoolkit } from '../../../apiConfig';

const { apiKey } = firebaseConfig;

export const SignIn = async ({ email, password }) => {
  try {
    const response = await apiIdentitytoolkit.post(`accounts:signInWithPassword?key=${apiKey}`, {
      email,
      password,
      returnSecureToken: true,
    });
    localStorage.setItem('currentUser', JSON.stringify(response.data));
    return response.data;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e.message);
  }
  return null;
};

export const SignOut = () => {
  localStorage.removeItem('currentUser');
};
