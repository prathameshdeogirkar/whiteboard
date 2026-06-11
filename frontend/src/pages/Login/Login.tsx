import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import keycloak from "../../auth/keycloak";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (keycloak.authenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleLogin = () => {
    keycloak.login({
      redirectUri: `${window.location.origin}/dashboard`,
    });
  };

  return (
    <main className="app-page d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-7 col-lg-5 col-xl-4">
            <div className="card border shadow-sm">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <div className="app-logo mx-auto mb-3">CW</div>
                  <h1 className="h4 mb-2">Collaborative Whiteboard</h1>
                  <p className="text-muted mb-0">
                    Sign in to create or join a shared drawing session.
                  </p>
                </div>

                <button
                  className="btn btn-primary w-100"
                  onClick={handleLogin}
                >
                  Login with Keycloak
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
