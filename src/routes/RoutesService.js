import { useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function RouteService({ location, history }) {
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (location.pathname === '/login' && currentUser) {
      const urlSearchParams = new URLSearchParams(location.search);
      const pathname = urlSearchParams.has('toUrl') ? urlSearchParams.get('toUrl') : '/inicio';
      urlSearchParams.delete('toUrl');
      history.push({ pathname });
    }
  }, [currentUser, history, location.pathname, location.search]);

  return null;
}

export default withRouter(RouteService);
