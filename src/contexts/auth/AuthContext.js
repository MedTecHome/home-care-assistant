import React, { createContext, useEffect, useState } from 'react';
import firebase from '../../firebase.config';

const auth = firebase.auth();

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('currentUser'));

  auth.onAuthStateChanged((observableUser) => {
    if (observableUser) {
      localStorage.setItem('currentUser', observableUser.uid);
      setCurrentUser(observableUser);
    } else {
      localStorage.removeItem('currentUser');
      setCurrentUser(null);
    }
  });

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
