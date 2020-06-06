import React, { useEffect } from 'react';
import { Route, withRouter, useHistory, useLocation } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { isLocal } from '../helpers/utils';

const PrivateRoutes = ({ path, component, exact }) => {
  const { pathname } = useLocation();
  const history = useHistory();
  const { currentUser } = useAuthContext();

  useEffect(() => {
    if (!isLocal && !currentUser) {
      const urlSearchParams = new URLSearchParams();
      urlSearchParams.set('toUrl', pathname);
      history.push({
        pathname: '/Login',
        search: urlSearchParams.toString()
      });
    }
  }, [currentUser, history, pathname]);

  return <Route history={history} path={path} component={component} exact={exact} />;
};

export default withRouter(PrivateRoutes);
