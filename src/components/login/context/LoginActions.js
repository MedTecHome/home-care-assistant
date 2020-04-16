import firebase from '../../../firebase.config';

const auth = firebase.auth();

export const SignInUser = ({ email, password }) => {
  // eslint-disable-next-line no-console
  auth.signInWithEmailAndPassword(email, password).catch((e) => console.error(e.message));
};

export const SignOutUser = () => {
  // eslint-disable-next-line no-console
  auth.signOut().catch((e) => console.error(e.message));
};
