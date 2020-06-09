import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

function RouteService({ location, history }) {
  const { currentUser } = useAuthContext();

  useEffect(() => {
    if (currentUser && location.pathname === '/login') {
      history.push('/inicio');
    } else if (!currentUser) {
      history.push('/login');
    }
  }, [currentUser, history, location.pathname, location.search]);

  return <div />;
}

export default withRouter(RouteService);
