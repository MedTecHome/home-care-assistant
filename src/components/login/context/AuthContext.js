import React, { createContext, useEffect, useState } from 'react';
import { SignIn, SignOut } from './AuthActions';

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    let user = null;
    if (localStorage.getItem('currentUser')) {
      user = JSON.parse(localStorage.getItem('currentUser'));
      setCurrentUser(user);
    }
  }, []);

  const SignInUser = async (credentials) => {
    const result = await SignIn(credentials);
    setCurrentUser(result);
  };

  const SignOutUser = () => {
    SignOut();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        SignInUser,
        SignOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
