import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import firebase, { authFirebase } from '../firebaseConfig';
import { getPropValue, isLocal } from '../helpers/utils';
import { USERNAME_DOMAIN, ERROR_MESSAGE } from '../commons/globalText';
import { getProfileById } from '../services/profiles';
import { useMessageContext } from '../MessageHandle/MessageContext';

authFirebase.setPersistence(firebase.auth.Auth.Persistence.SESSION);

const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
  const { RegisterMessage } = useMessageContext();
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
      try {
        if (user) {
          const idToken = await user.getIdToken();
          localStorage.setItem('AuthToken', `Bearer ${idToken}`);
          const profile = await getProfileById(user.uid);
          if (profile) {
            setCurrentUserProfile(profile);
          }
        } else if (isLocal) {
          //const id = '6KkcyToAmdQnmpdr7HTxIFYuZEI2'; // admin id
          const id = 'NSs59e3B3nhEmeqWGYqJdbLVpBD3'; // clinic id
          //const id = 'qQqcCclJu6NVdFdDoRyhSfj6cqf1'; // doctor id
          // const id = 'BVNNgM65uJgMRpQqAveHdwhx63S2'; // paciente id
          const profile = await getProfileById(id);
          if (profile) {
            setCurrentUserProfile(profile);
          }
        } else {
          setCurrentUserProfile(null);
        }
      } catch (e) {
        RegisterMessage(ERROR_MESSAGE, e, 'AuthContext');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [RegisterMessage]);

  const setAndClearErrorState = error => {
    setErrorState(error);
    const timeOut = setTimeout(() => {
      setErrorState(null);
      clearTimeout(timeOut);
    }, 10000);
  };

  const signInUser = useCallback(async ({ username, password }) => {
    const email = `${username}${USERNAME_DOMAIN}`;

    try {
      return await authFirebase.signInWithEmailAndPassword(email, password);
    } catch (e) {
      setAndClearErrorState(e);
      return null;
    }
  }, []);

  const signOutUser = useCallback(() => authFirebase.signOut(), []);

  const valueMemoize = useMemo(
    () => ({
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
    }),
    [
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
    ]
  );

  return <AuthContext.Provider value={valueMemoize}>{children}</AuthContext.Provider>;
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
