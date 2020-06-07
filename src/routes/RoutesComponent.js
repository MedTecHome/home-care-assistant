import React from 'react';
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
      ).map(({ path, roles, component, redirectTo }, index) => {
        if (!isEmpty(roles) && roles) {
          return <PrivateRoutes key={index.toString()} path={path} exact component={component || redirectTo} />;
        }
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <Route key={index.toString()} {...(path ? { path } : {})} exact component={component || redirectTo} />;
      })}
    </Switch>
  );
}

export default RoutesComponent;
