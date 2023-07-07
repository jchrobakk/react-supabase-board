import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../layouts/RootLayout';
import { useContext } from 'react';
const AuthRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useContext(UserContext);
  const location = useLocation();

  return auth.session ? (
    { ...children }
  ) : (
    <Navigate
      to={'/'}
      replace
      state={{ path: location.pathname }}
    />
  );
};

export default AuthRoute;
