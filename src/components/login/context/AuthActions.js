import { authFirebase } from '../../../firebaseConfig';

export const signIn = async ({ email, password }) => authFirebase.signInWithEmailAndPassword(email, password);

export const signOut = () => authFirebase.signOut();
