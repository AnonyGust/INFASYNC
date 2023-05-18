import { Navigate } from 'react-router-dom';

export function PrivateRoute({ children }) {
  const token = sessionStorage.getItem('bearer');

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
}
