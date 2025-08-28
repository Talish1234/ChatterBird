import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import type { RootState } from "../../Redux/Store";
import { useSelector } from "react-redux";
const AuthRoute = ({
  children,
  path,
}: {
  children: ReactNode;
  path: string;
}) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.authUser.user
  );
  return isAuthenticated ? <>{children}</> : <Navigate to={path} replace />;
};

export default AuthRoute;
