import React, { useEffect } from 'react';
import { SignOutUser } from '../../contexts/auth/LoginActions';

function LogoutComponent({ history }) {
  useEffect(() => {
    SignOutUser();
  }, [history]);
  return <></>;
}

export default LogoutComponent;
