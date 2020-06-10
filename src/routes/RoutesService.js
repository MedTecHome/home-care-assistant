import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { isLocal } from '../helpers/utils';

function RouteService({ location, history }) {
  const { currentUser } = useAuthContext();

  const isLogin = isLocal ? true : !!currentUser;

  useEffect(() => {
    if (isLogin && location.pathname === '/login') {
      history.push('/inicio');
    } else if (!isLogin) {
      history.push('/login');
    }
  }, [isLogin, history, location.pathname, location.search]);

  return <div />;
}

export default withRouter(RouteService);
