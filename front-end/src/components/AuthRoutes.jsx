import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoutes = () => {
  const user = useSelector(state => {
    return state.user;
  });

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthRoutes;
