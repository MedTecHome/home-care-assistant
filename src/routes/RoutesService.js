import React, { useContext, useEffect, useMemo } from 'react';
import { withRouter } from 'react-router-dom';
import { AuthContext } from '../components/login/context/AuthContext';

function RouteService({ location, history }) {
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    if (location.pathname === '/login' && currentUser) {
      const pathname = urlSearchParams.has('toUrl') ? urlSearchParams.get('toUrl') : '/inicio';
      urlSearchParams.delete('toUrl');
      history.push({
        pathname,
        search: urlSearchParams.toString(),
      });
    }
    if (location.pathname === '/logout' && !currentUser) {
      history.push('/login');
    }
  }, [location, currentUser]);

  return <div />;
}

export default withRouter(RouteService);
