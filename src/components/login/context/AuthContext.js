import React, { createContext, useEffect, useState } from 'react';
import { signIn, signOut } from './AuthActions';
import { authFirebase } from '../../../firebaseConfig';

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (authFirebase.currentUser) setCurrentUser(authFirebase.currentUser);
  }, []);

  const signInUser = async (credentials) => {
    try {
      await signIn(credentials);
      setCurrentUser(authFirebase.currentUser);
    } catch (error) {
      // else handle authentication errors
    }
  };

  const signOutUser = () => {
    signOut();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signInUser,
        signOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
