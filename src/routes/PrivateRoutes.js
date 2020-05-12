import React, { useEffect } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

const PrivateRoutes = ({ location, history, path, component, exact }) => {
  const { currentUser } = useAuthContext();

  /** useEffect(() => {
    if (!currentUser) {
      const urlSearchParams = new URLSearchParams();
      urlSearchParams.set('toUrl', location.pathname);
      history.push({
        pathname: '/login',
        search: urlSearchParams.toString()
      });
    }
  }, [currentUser, history, location.pathname]); */

  return <Route history={history} path={path} component={component} exact={exact} />;
};

export default withRouter(PrivateRoutes);
