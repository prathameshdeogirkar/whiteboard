import keycloak from "../../auth/keycloak";

const UserNavbar = () => {
  const username =
    keycloak.tokenParsed?.preferred_username || "Signed in user";

  return (
    <nav className="navbar navbar-expand bg-white border-bottom">
      <div className="container-fluid px-3 px-md-4">
        <span className="navbar-brand mb-0 h1">Collaborative Whiteboard</span>

        <div className="d-flex align-items-center gap-2 gap-sm-3">
          <span className="text-muted small d-none d-sm-inline">
            {username}
          </span>

          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() =>
              keycloak.logout({
                redirectUri: window.location.origin,
              })
            }
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
