import firebase from '../../firebase.config';

const auth = firebase.auth();

export const SignInUser = ({ email, password }) => {
  auth.signInWithEmailAndPassword(email, password).catch((e) => console.error(e.message));
};

export const SignOutUser = () => {
  auth.signOut().catch((e) => console.error(e.message));
};
