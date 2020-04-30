import React, { createContext, useCallback, useEffect, useState } from 'react';
import { authFirebase, dbRef } from '../firebaseConfig';
import { saveProfileValuesAction } from '../components/profiles/reducers/ProfileActions';
import { ADD_FORM_TEXT } from '../commons/globalText';

export const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserProfile, setCurrentUserProfile] = useState(null);
  const [errorState, setErrorState] = useState(null);

  useEffect(() => {
    const unsubscribe = authFirebase.onAuthStateChanged(async user => {
      setCurrentUser(user);
      if (user) {
        const profile = await dbRef('profile').collection('profiles').where('user.email', '==', user.email).get();
        setCurrentUserProfile({ id: profile.docChanges()[0].doc.id, ...profile.docChanges()[0].doc.data() });
      } else
        setCurrentUserProfile({
          id: '2',
          fullname: 'jajaja',
          role: {
            id: 'admin',
          },
        });
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
      throw new Error(e);
    }
  };

  const signOutUser = () => authFirebase.signOut();

  const signUpUser = useCallback(async ({ email, password, passwordConfirm, ...values }) => {
    try {
      const { user } = await authFirebase.createUserWithEmailAndPassword(email, password);
      return await saveProfileValuesAction({ ...values, user: { id: user.uid, email: user.email } }, ADD_FORM_TEXT);
    } catch (e) {
      setAndClearErrorState(e);
      throw new Error(e);
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
        errorState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
