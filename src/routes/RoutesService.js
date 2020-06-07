import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

/**
 * @return {null}
 */
function RouteService({ location, history }) {
  const { currentUser } = useAuthContext();

  useEffect(() => {
    if (location.pathname === '/Login' && currentUser) {
      const urlSearchParams = new URLSearchParams(location.search);
      const pathname = urlSearchParams.has('toUrl') ? urlSearchParams.get('toUrl') : '/inicio';
      urlSearchParams.delete('toUrl');
      history.push({ pathname });
    }
  }, [currentUser, history, location.pathname, location.search]);

  return null;
}

export default withRouter(RouteService);
