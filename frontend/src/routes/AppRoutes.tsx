import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Whiteboard from "../pages/Whiteboard/Whiteboard";
import keycloak from "../auth/keycloak";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  if (!keycloak.authenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/board/:sessionId"
        element={
          <ProtectedRoute>
            <Whiteboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
