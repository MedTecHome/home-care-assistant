import React, { createContext, useEffect, useState } from 'react';
import { authFirebase } from '../firebaseConfig';

export const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = authFirebase.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signInUser = async ({ email, password }) => {
    try {
      await authFirebase.signInWithEmailAndPassword(email, password);
    } catch (error) {
      // else handle authentication errors
    }
  };

  const signOutUser = () => authFirebase.signOut();

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
