import React, { useEffect } from 'react';
import { SignOutUser } from './context/LoginActions';

function LogoutComponent({ history }) {
  useEffect(() => {
    SignOutUser();
  }, [history]);
  return <></>;
}

export default LogoutComponent;
