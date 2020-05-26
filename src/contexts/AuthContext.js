import React, { createContext, useContext, useEffect, useState } from 'react';
import { authFirebase, dbRef } from '../firebaseConfig';
import { getPropValue } from '../helpers/utils';
import { USERNAME_DOMAIN } from '../commons/globalText';

const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserProfile, setCurrentUserProfile] = useState(null);
  const [errorState, setErrorState] = useState(null);

  const isAdmin = getPropValue(currentUserProfile, 'role.id') === 'admin';
  const isClinic = getPropValue(currentUserProfile, 'role.id') === 'clinic';
  const isDoctor = getPropValue(currentUserProfile, 'role.id') === 'doctor';
  const isPatient = getPropValue(currentUserProfile, 'role.id') === 'patient';

  useEffect(() => {
    const unsubscribe = authFirebase.onAuthStateChanged(async user => {
      setCurrentUser(user);
      if (user) {
        const idToken = await user.getIdToken();
        localStorage.setItem('AuthToken', `Bearer ${idToken}`);
        const profile = await dbRef('profile').collection('profiles').doc(user.uid).get();
        if (profile.data()) {
          setCurrentUserProfile({ id: profile.id, ...profile.data() });
        }
      } else {
        // setCurrentUserProfile(null);
        setCurrentUserProfile({
          // id: 'I1vSS10EraPTIeCXKMjzVUGzkky2', // admin id
          // id: '0jiMdIL37AYxMlvCKsmaOBWpcYi2', // clinic id
          id: 'YNugQQvF5fhcFfXAN4UbQkYcakV2', // doctor id
          //  id: 'WnXuxUETcvMk6b0exGRLUC5slTf2', // paciente id

          user: { email: 'localhost@local' },
          fullname: 'bla bla bla',
          hospital: {
            id: 'q3fi3hFCIF8gLOPl3I7o',
            name: 'Hopistal 1 abla bla'
          },
          role: {
            // id: 'admin'
            // id: 'clinic'
            id: 'doctor'
            //  id: 'patient'
          }
        });
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
    isAdmin: values.isAdmin,
    isClinic: values.isClinic,
    isDoctor: values.isDoctor,
    isPatient: values.isPatient,
    signInUser: values.signInUser,
    signOutUser: values.signOutUser,
    errorState: values.errorState
  };
};
