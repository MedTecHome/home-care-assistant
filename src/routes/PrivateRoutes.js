/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { AuthContext } from '../components/login/context/AuthContext';

const PrivateRoutes = ({ location, history, ...props }) => {
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser) {
      const urlSearchParams = new URLSearchParams();
      urlSearchParams.set('toUrl', location.pathname);
      history.push({
        pathname: '/login',
        search: urlSearchParams.toString(),
      });
    }
  }, []);

  return <Route {...props} />;
};

export default withRouter(PrivateRoutes);
