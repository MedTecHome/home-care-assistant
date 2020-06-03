import React from 'react';
import uuid from 'uuid4';
import { Route, Switch } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import RouteListConfig from './RoutesListConfig';
import { useAuthContext } from '../contexts/AuthContext';
import { isEmpty } from '../helpers/utils';

function RoutesComponent() {
  const { currentUserProfile } = useAuthContext();
  return (
    <Switch>
      {RouteListConfig.filter(
        route =>
          isEmpty(route.roles) ||
          !route.roles ||
          (route.roles && currentUserProfile && route.roles.includes(currentUserProfile.role))
      ).map(({ path, roles, component }) => {
        if (!isEmpty(roles) && roles) {
          return <PrivateRoutes key={uuid()} path={path} exact component={component} />;
        }
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <Route key={uuid()} {...(path ? { path } : {})} exact component={component} />;
      })}
    </Switch>
  );
}

export default RoutesComponent;
