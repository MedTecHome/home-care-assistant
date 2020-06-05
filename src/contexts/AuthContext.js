import React, { createContext, useContext, useEffect, useState } from 'react';
import { authFirebase } from '../firebaseConfig';
import { getPropValue } from '../helpers/utils';
import { USERNAME_DOMAIN } from '../commons/globalText';
import { getProfileById } from '../services/profiles';

const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserProfile, setCurrentUserProfile] = useState(null);
  const [errorState, setErrorState] = useState(null);

  const isSuperadmin = getPropValue(currentUserProfile, 'role') === 'superadmin';
  const isAdmin = getPropValue(currentUserProfile, 'role') === 'admin';
  const isClinic = getPropValue(currentUserProfile, 'role') === 'clinic';
  const isDoctor = getPropValue(currentUserProfile, 'role') === 'doctor';
  const isPatient = getPropValue(currentUserProfile, 'role') === 'patient';

  useEffect(() => {
    const unsubscribe = authFirebase.onAuthStateChanged(async user => {
      setCurrentUser(user);
      if (user) {
        const idToken = await user.getIdToken();
        localStorage.setItem('AuthToken', `Bearer ${idToken}`);
        const profile = await getProfileById(user.uid);
        if (profile) {
          setCurrentUserProfile(profile);
        }
      } else {
        setCurrentUserProfile(null);

        /* // const id = 'I1vSS10EraPTIeCXKMjzVUGzkky2'; // admin id
        // const id = '0jiMdIL37AYxMlvCKsmaOBWpcYi2'; // clinic id
        const id = 'YNugQQvF5fhcFfXAN4UbQkYcakV2'; // doctor id
        // const id = 'WnXuxUETcvMk6b0exGRLUC5slTf2'; // paciente id
        const profile = await getProfileById(id);
        if (profile) {
          setCurrentUserProfile(profile);
        } */
      }
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

  const signInUser = async ({ username, password }) => {
    const email = `${username}${USERNAME_DOMAIN}`;

    try {
      return await authFirebase.signInWithEmailAndPassword(email, password);
    } catch (e) {
      setAndClearErrorState(e);
      return null;
    }
  };

  const signOutUser = () => authFirebase.signOut();

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentUserProfile,
        isSuperadmin,
        isAdmin,
        isClinic,
        isDoctor,
        isPatient,
        signInUser,
        signOutUser,
        errorState
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const values = useContext(AuthContext);
  if (!values) throw new Error('This only works inside AuthContextProvider');
  return {
    currentUser: values.currentUser,
    currentUserProfile: values.currentUserProfile,
    isSuperadmin: values.isSuperadmin,
    isAdmin: values.isAdmin,
    isClinic: values.isClinic,
    isDoctor: values.isDoctor,
    isPatient: values.isPatient,
    signInUser: values.signInUser,
    signOutUser: values.signOutUser,
    errorState: values.errorState
  };
};
