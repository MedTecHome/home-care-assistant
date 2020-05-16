import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { authFirebase, dbRef } from '../firebaseConfig';
import { saveProfileValuesAction } from '../components/Profiles/reducers/ProfileActions';
import { ADD_FORM_TEXT } from '../commons/globalText';
import { getPropValue } from '../helpers/utils';

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
        const profile = await dbRef('profile').collection('profiles').doc(user.uid).get();
        if (profile.data()) {
          setCurrentUserProfile({ id: profile.id, ...profile.data() });
        }
      } else {
        setCurrentUserProfile(null);
        /** setCurrentUserProfile({
          // id: 'AoNyOoFK2VBMSvd4nFXN', // admin id
          // id: '7NTTFpPt4HVsufZR9eY0Vi7t81l2', // clinic id
          // id: 'K6Ps07L1VrZ2n4VUJXdJWThBs4F3', // doctor id
          id: 'ZwYARyBS3arEhzYeDAYr', // paciente id

          user: { email: 'localhost@local' },
          fullname: 'bla bla bla',
          hospital: {
            id: 'q3fi3hFCIF8gLOPl3I7o'
          },
          role: {
            // id: 'admin'
            // id: 'clinic'
            // id: 'doctor'
            id: 'patient'
          }
        }); */
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
        isAdmin,
        isClinic,
        isDoctor,
        isPatient,
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
    signUpUser: values.signUpUser,
    errorState: values.errorState
  };
};
