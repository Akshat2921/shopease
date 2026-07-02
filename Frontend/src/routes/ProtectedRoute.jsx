import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// requireAdmin=true -> only isAdmin users pass, others get redirected to home.
// otherwise -> any logged-in user passes, guests get redirected to login.
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  if (!currentUser) return <Navigate to="/login" replace />;
  if (requireAdmin && !currentUser.isAdmin) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
