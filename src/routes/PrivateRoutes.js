import React, { useContext, useEffect } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { AuthContext } from '../components/login/context/AuthContext';
import { authFirebase } from '../firebaseConfig';

const PrivateRoutes = ({ location, history, path, component, exact }) => {
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!authFirebase.currentUser) {
      const urlSearchParams = new URLSearchParams();
      urlSearchParams.set('toUrl', location.pathname);
      history.push({
        pathname: '/login',
        search: urlSearchParams.toString(),
      });
    }
  }, [currentUser, history, location.pathname]);

  return <Route path={path} component={component} exact={exact} />;
};

export default withRouter(PrivateRoutes);
