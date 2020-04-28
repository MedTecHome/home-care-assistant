import React, { useContext } from 'react';
import uuid from 'uuid4';
import { Route, Switch } from 'react-router-dom';
import { isEmpty, isNil } from 'ramda';
import PrivateRoutes from './PrivateRoutes';
import RouteListConfig from './RoutesListConfig';
import { AuthContext } from '../contexts/AuthContext';

function RoutesComponent() {
  const { currentUserProfile } = useContext(AuthContext);
  return (
    <Switch>
      {RouteListConfig.filter(
        route =>
          isEmpty(route.roles) ||
          isNil(route.roles) ||
          (route.roles && currentUserProfile && route.roles.includes(currentUserProfile.role.id))
      ).map(({ path, roles, component }) => {
        if (!isEmpty(roles) && !isNil(roles)) {
          return <PrivateRoutes key={uuid()} path={path} exact component={component} />;
        }
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <Route key={uuid()} {...(path ? { path } : {})} exact component={component} />;
      })}
    </Switch>
  );
}

export default RoutesComponent;
