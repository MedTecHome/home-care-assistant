import React, { useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';

function LogoutComponent({ location }) {
  const { SignOutUser } = useContext(AuthContext);
  useEffect(() => {
    SignOutUser();
  }, [location]);
  return <></>;
}

export default LogoutComponent;
