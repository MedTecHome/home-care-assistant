import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import firebase, { authFirebase } from '../firebaseConfig';
import { getPropValue, isLocal } from '../helpers/utils';
import { USERNAME_DOMAIN, ERROR_MESSAGE } from '../commons/globalText';
import { getProfileById } from '../services/profiles';
import { useMessageContext } from '../MessageHandle/MessageContext';
import ErrorMessages from '../MessageHandle/errorMessages';

window.onbeforeunload = function clearLocalStorage() {
  localStorage.removeItem('AuthToken');
};

authFirebase.setPersistence(firebase.auth.Auth.Persistence.SESSION);

const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
  const { RegisterMessage } = useMessageContext();
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserProfile, setCurrentUserProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);

  const isSuperadmin = getPropValue(currentUserProfile, 'role') === 'superadmin';
  const isAdmin = getPropValue(currentUserProfile, 'role') === 'admin';
  const isClinic = getPropValue(currentUserProfile, 'role') === 'clinic';
  const isDoctor = getPropValue(currentUserProfile, 'role') === 'doctor';
  const isPatient = getPropValue(currentUserProfile, 'role') === 'patient';

  useEffect(() => {
    const unsubscribe = authFirebase.onAuthStateChanged(async user => {
      try {
        if (user) {
          setCurrentUser(user);
          const idToken = await user.getIdToken();
          localStorage.setItem('AuthToken', `Bearer ${idToken}`);
          setLoadingProfile(true);
          const profile = await getProfileById(user.uid);
          if (profile) {
            setCurrentUserProfile(profile);
          }
        } else if (isLocal) {
          // const id = '6KkcyToAmdQnmpdr7HTxIFYuZEI2'; // admin id
          // const id = 'NSs59e3B3nhEmeqWGYqJdbLVpBD3'; // clinic id
          const id = 'qQqcCclJu6NVdFdDoRyhSfj6cqf1'; // doctor id
          // const id = 'uwn5zisCNPOgzRfP3PDISTP23iT2'; // doctor id blaze
          // const id = '8nFFoW1hILdsCRq0zgDUoHQyVXs1'; // paciente id
          // const id = 'w8N7ACCePIc5YpQZrkXTCHxQgw83'; // paciente id blaze
          setLoadingProfile(true);
          const profile = await getProfileById(id);
          if (profile) {
            setCurrentUserProfile(profile);
          }
        } else {
          setCurrentUser(user);
          setCurrentUserProfile(null);
        }
      } catch (e) {
        RegisterMessage(ERROR_MESSAGE, e, 'AuthContext');
      } finally {
        setLoadingProfile(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [RegisterMessage]);

  const signInUser = useCallback(async ({ username, password }) => {
    const email = `${username}${USERNAME_DOMAIN}`;
    try {
      await authFirebase.signInWithEmailAndPassword(email, password);
    } catch (e) {
      throw new Error(ErrorMessages[e.code]);
    }
  }, []);

  const signOutUser = useCallback(() => {
    authFirebase.signOut();
    localStorage.removeItem('AuthToken');
  }, []);

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
      loadingProfile
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
      loadingProfile
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
    errorState: values.errorState,
    loadingProfile: values.loadingProfile
  };
};
