import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { authFirebase, dbRef } from '../firebaseConfig';
import { saveProfileValuesAction } from '../components/profiles/reducers/ProfileActions';
import { ADD_FORM_TEXT } from '../commons/globalText';

const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserProfile, setCurrentUserProfile] = useState(null);
  const [errorState, setErrorState] = useState(null);

  useEffect(() => {
    const unsubscribe = authFirebase.onAuthStateChanged(async user => {
      setCurrentUser(user);
      if (user) {
        const profile = await dbRef('profile').collection('profiles').where('user.id', '==', user.uid).get();
        if (profile.docChanges()[0]) {
          setCurrentUserProfile({ id: profile.docChanges()[0].doc.id, ...profile.docChanges()[0].doc.data() });
        }
      } else setCurrentUserProfile(null);
      /* setCurrentUserProfile({
          id: 'AoNyOoFK2VBMSvd4nFXN', // admin id
          // id: 'OyE16UfGemph3hdKjAyJ', // clinic id
          // id: 'pwA1hXTKogAt9gCS34rJ', // doctor id
          // id: 'ZwYARyBS3arEhzYeDAYr', // paciente id

          user: { email: 'localhost@local' },
          fullname: 'bla bla bla',
          hospital: {
            id: 'q3fi3hFCIF8gLOPl3I7o'
          },
          role: {
            id: 'admin'
            // id: 'clinic'
            // id: 'doctor'
            // id: 'patient',
          }
        }); */
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const setAndClearErrorState = error => {
    setErrorState(error);
    const timeOut = setTimeout(() => {
      setErrorState(null);
      clearTimeout(timeOut);
    }, 10000);
  };

  const signInUser = async ({ email, password }) => {
    try {
      return await authFirebase.signInWithEmailAndPassword(email, password);
    } catch (e) {
      setAndClearErrorState(e);
      return null;
    }
  };

  const signOutUser = () => authFirebase.signOut();

  const signUpUser = useCallback(async ({ email, password, passwordConfirm, ...values }) => {
    try {
      const { user } = await authFirebase.createUserWithEmailAndPassword(email, password);
      return await saveProfileValuesAction({ ...values, user: { id: user.uid, email: user.email } }, ADD_FORM_TEXT);
    } catch (e) {
      setAndClearErrorState(e);
      return null;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentUserProfile,
        signInUser,
        signOutUser,
        signUpUser,
        errorState
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const values = useContext(AuthContext);
  if (!values) throw new Error('This only works iside AuthContextProvider');
  return {
    currentUser: values.currentUser,
    currentUserProfile: values.currentUserProfile,
    signInUser: values.signInUser,
    signOutUser: values.signOutUser,
    signUpUser: values.signUpUser,
    errorState: values.errorState
  };
};
