import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const AdminRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  return user?.email === 'rasuladmin@gmail.com' ? children : <Navigate to="/dashboard" />;
};

export default AdminRoute;